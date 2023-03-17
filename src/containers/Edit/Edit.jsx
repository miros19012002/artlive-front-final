import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import Button from "../../components/Button/Button";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";
import { UpdateData } from "../../services/User/UpdateData";
import { getUser } from "../../services/User/getUser";
import styles from "./Edit.module.css";

const Edit = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    getUser().then((res) => {
      form.setFieldsValue({ login: res.data.login, email: res.data.email });
    });
  }, [form]);

  const onFinish = (values) => {
    delete values.confirm;

    UpdateData(values)
      .then(() => message.success("Данные обновлены успешно!"))
      .catch(() => message.error("Произошла ошибка!"));
  };
  return (
    <div className={styles.edit}>
      <div className={styles.editContainer}>
        <BreadcrumbComponent
          crumbs={[
            { path: "/", name: "Главная" },
            { path: "/account", name: "Личный кабинет" },
            { path: "", name: "Изменить личные данные" },
          ]}
        />
        <h2>Изменить личные данные</h2>
        <Form className={styles.form} form={form} onFinish={onFinish}>
          <Form.Item
            name="login"
            rules={[{ required: true, message: "Введите логин" }]}
          >
            <Input placeholder="Создайте логин" className={styles.modalInput} />
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
            name="phone_number"
            rules={[{ required: true, message: "Введите номер телефона" }]}
          >
            <Input placeholder="Телефон" className={styles.modalInput} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password
              placeholder="Пароль"
              className={styles.modalInput}
            />
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
              text="Сохранить"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
