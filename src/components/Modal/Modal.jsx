import React, { useCallback, useEffect, useState } from "react";
import {
  Radio,
  Space,
  Form,
  Input,
  message,
  Modal,
  notification,
  Typography,
} from "antd";
import Button from "../Button/Button";
import stars from "../../assets/images/modal/stars.png";
import status from "../../assets/images/status/status_wom.png";
import { useDispatch, useSelector } from "react-redux";
import {
  Login,
  Registration,
  resetNotificationConfig,
} from "../../store/reducers/AuthReducer";
import { createFeedback } from "../../services/Feedback/createFeedback";
import moment from "moment";
import styles from "./Modal.module.css";
import FormItem from "antd/lib/form/FormItem";
import { ADMIN, parseUserRole } from "../../utils/parseUserRole";
import { ACCESS_TOKEN } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/User/getUser";
import { UpdateStatus } from "../../services/Order/Admin/UpdateStatus";

const AuthModal = ({ switchType, closeModal }) => {
  const { errorLogin, errorStatus, loginSuccess } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const { Text } = Typography;
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginSuccess) {
      message.success("Вы успешно вошли!");
      closeModal();
    }

    if (parseUserRole(localStorage.getItem(ACCESS_TOKEN)) === ADMIN) {
      navigate("/admin");
    }
  }, [loginSuccess]);

  const onFinish = (values) => {
    dispatch(Login(values));
  };

  return (
    <div className={styles.modal}>
      <h3 className={styles.modalTitle}>Вход</h3>
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Введите e-mail" },
            // { type: "email", message: "Не соответствует типу e-mail" },
          ]}
        >
          <Input placeholder="E-mail" className={styles.modalInput} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="Пароль" className={styles.modalInput} />
        </Form.Item>
        {errorLogin && (
          <Form.Item>
            <Text type="danger">
              {errorStatus === 401 && "Неверный e-mail или пароль"}
            </Text>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="submit" width="300px" lineHeight="48px" text="Войти" />
        </Form.Item>
      </Form>

      <span className={styles.modalText} onClick={() => switchType("reg")}>
        Создать аккаунт
      </span>
    </div>
  );
};

const RegModal = ({ switchType, closeModal }) => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.auth);

  const openNotificationWithIcon = useCallback(
    (notificationType) => {
      notification[notificationType]({
        message: "Registation status",
        description: message,
      });
    },
    [message]
  );

  useEffect(() => {
    if (type !== "info") {
      openNotificationWithIcon(type);
    }

    if (type === "success") {
      closeModal();
    }
  }, [openNotificationWithIcon, type]);

  const onFinish = (values) => {
    delete values["confirm"];
    dispatch(Registration(values));

    dispatch(resetNotificationConfig());
  };

  return (
    <div className={styles.modal}>
      <h3 className={styles.modalTitle}>Регистрация</h3>
      <Form onFinish={onFinish}>
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input placeholder="Логин" className={styles.modalInput} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Введите e-mail" },
            { type: "email", message: "Не соответствует типу e-mail" },
          ]}
        >
          <Input placeholder="E-mail" className={styles.modalInput} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="Пароль" className={styles.modalInput} />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Повторите пароль" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Повторите пароль"
            className={styles.modalInput}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="submit"
            width="300px"
            lineHeight="48px"
            text="Зарегистрироваться"
          />
        </Form.Item>
      </Form>

      <span className={styles.modalText} onClick={() => switchType("auth")}>
        Уже есть аккаунт?
      </span>
    </div>
  );
};

const FeedbackModal = ({ switchType, closeModal, getFeedbacks }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    getUser().then((res) => form.setFieldsValue({ login: res.data.login }));
  }, [form]);

  const onFinish = (values) => {
    delete values["login"];
    values.created = moment();
    createFeedback(values)
      .then((res) => {
        switchType("thanks");
        getFeedbacks();
        setTimeout(() => {
          closeModal();
        }, 1000);
      })
      .catch(() => {
        message.error("Произошла ошибка!");
      });
  };

  return (
    <div className={styles.modal}>
      <h3 className={styles.modalTitle}>Оставить отзыв</h3>
      <Form onFinish={onFinish} form={form}>
        <Form.Item name="login">
          <Input placeholder="Логин" readOnly className={styles.modalInput} />
        </Form.Item>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Введите сообщение",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Введите текст"
            className={styles.textArea}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="submit"
            width="300px"
            lineHeight="48px"
            text="Отправить"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

const ThanksModal = () => {
  return (
    <div className={styles.modalThanks}>
      <h3 className={styles.modalTitle}>Спасибо за Ваш отзыв!</h3>
      <img src={stars} alt="stars" />
      <p className={styles.text}>
        Мы заботимся о наших клиентах, а также о качестве предоставляемых нами
        услуг.
      </p>
    </div>
  );
};

const OrderModal = () => {
  return (
    <div className={styles.modalOrder}>
      <h3 className={styles.orderTitle}>Спасибо за Ваш заказ!</h3>
      <img src={status} alt="woman" />
      <span>Номер Вашего заказа 12345</span>
      <p className={styles.text}>
        Менеджер свяжется с Вами в течение 15-ти минут для подтверждения заказа.
      </p>
    </div>
  );
};

const StatusModal = ({ id, setClick, closeModal }) => {
  const onFinish = async (values) => {
    const { status } = values;

    try {
      await UpdateStatus(id, status);
      setClick((prev) => !prev);
      message.success("Статус обновлен!");
      closeModal();
    } catch (e) {
      message.error("Произошла ошибка!");
    }
  };

  return (
    <div className={styles.modalStatus}>
      <h3 className={styles.modalTitle}>Смена статуса заказа</h3>{" "}
      <Form onFinish={onFinish} className={styles.formItem}>
        <FormItem name="status">
          <Radio.Group>
            <Space direction="vertical">
              <Radio className={styles.radioTitle} value={1}>
                Ожидает оплаты
              </Radio>
              <Radio className={styles.radioTitle} value={2}>
                Оплачен
              </Radio>
              <Radio className={styles.radioTitle} value={3}>
                Ожидает отправки
              </Radio>
              <Radio className={styles.radioTitle} value={4}>
                Завершен
              </Radio>
            </Space>
          </Radio.Group>
        </FormItem>
        <FormItem name="status">
          <Button
            type="submit"
            width="300px"
            lineHeight="48px"
            text="Сохранить"
          />
        </FormItem>
      </Form>
    </div>
  );
};

const ModalCustom = ({
  visible,
  type,
  switchType,
  onCancel,
  closeModal,
  basketId,
  setClick,
  getFeedbacks,
}) => {
  const content = () => {
    switch (type) {
      case "auth":
        return <AuthModal switchType={switchType} closeModal={closeModal} />;
      case "reg":
        return <RegModal switchType={switchType} closeModal={closeModal} />;
      case "feedback":
        return (
          <FeedbackModal
            getFeedbacks={getFeedbacks}
            switchType={switchType}
            closeModal={closeModal}
          />
        );
      case "thanks":
        return <ThanksModal />;
      case "order":
        return <OrderModal />;
      case "status":
        return (
          <StatusModal
            closeModal={closeModal}
            setClick={setClick}
            id={basketId}
          />
        );
      default:
        return;
    }
  };

  return (
    <Modal
      visible={visible}
      width={type === "feedback" ? 600 : 550}
      footer={false}
      onCancel={onCancel}
      destroyOnClose
    >
      {content()}
    </Modal>
  );
};

export default ModalCustom;
