import React, { useEffect } from "react";
import { GetAddress } from "../../services/Address/GetAddress";

const Contacts = () => {
  useEffect(() => {
    GetAddress();
  }, []);

  return (
    <>
      <div>
        <a href="https://yandex.ru/maps/39/rostov-na-donu/search/%D0%90%D0%BF%D1%82%D0%B5%D0%BA%D0%B0/?utm_medium=mapframe&utm_source=maps">
          Аптека в Ростове‑на‑Дону
        </a>
        <a href="https://yandex.ru/maps/39/rostov-na-donu/?utm_medium=mapframe&utm_source=maps">
          Ростов‑на‑Дону
        </a>
        <iframe
          src="https://yandex.ru/map-widget/v1/-/CCUJRVtMcC"
          width={"100%"}
          height={400}
          frameBorder={1}
          allowFullScreen={true}
        ></iframe>
      </div>
    </>
  );
};

const MemoContacts = React.memo(Contacts);

export default MemoContacts;
