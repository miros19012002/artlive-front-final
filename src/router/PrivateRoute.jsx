import React from "react";
import Wrapper from "../components/Wrapper/Wrapper";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ADMIN, parseUserRole } from "../utils/parseUserRole";
import { ACCESS_TOKEN } from "../api/api";

const PrivateRoute = ({ component }) => {
  const { isAuth } = useSelector((state) => state.auth);

  return isAuth &&
    parseUserRole(localStorage.getItem(ACCESS_TOKEN)) !== ADMIN ? (
    <Wrapper>{component}</Wrapper>
  ) : (
    <Navigate to="/" />
  );

  //   аналогично <Wrapper children={component} />
};

export default PrivateRoute;

// const PrivateRoute = ({ component }) => {
//     const { isAuth } = useSelector((state) => state.auth);
//     const [modalType, setModalType] = useState("");
//     const [visible, setVisible] = useState(false);

//   z
//     return isAuth ? (
//       <Wrapper>{component}</Wrapper>
//     ) : (
//       // <ModalCustom type="auth" visible="visible" />
//       <ModalCustom
//         closeModal={() => {
//           setModalType("");
//           setVisible(false);
//         }}
//         visible={visible}
//         type={modalType}
//         switchType={setModalType}
//         onCancel={() => {
//           setModalType("");
//           setVisible(false);
//         }}
//       />
//     );

//     //   аналогично <Wrapper children={component}   />
//   };
//   export default PrivateRoute;
