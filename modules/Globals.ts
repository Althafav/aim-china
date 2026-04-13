import { TypeResolver } from "./TypeResolvers";


const KontentDelivery = require("@kentico/kontent-delivery");

export default class Globals {
  static PROJECT_ID: string = "615577b9-4e2b-0074-b4f8-20f11d30f5ae";

  static SECURE_API_KEY: string =
    "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogIjE5YjlkNjllZGMwZTQyN2U5NjNmZDlhNTE1MzRmODlhIiwNCiAgImlhdCI6ICIxNjI2MzMyMDY0IiwNCiAgImV4cCI6ICIxOTcxOTMyMDY0IiwNCiAgInZlciI6ICIxLjAuMCIsDQogICJwcm9qZWN0X2lkIjogIjYxNTU3N2I5NGUyYjAwNzRiNGY4MjBmMTFkMzBmNWFlIiwNCiAgImF1ZCI6ICJkZWxpdmVyLmtlbnRpY29jbG91ZC5jb20iDQp9.QFwPat7Wia81kJxmckCHhS9vcJLg6T5mPdHxFUnlr18";


  static KontentClient: any = new KontentDelivery.DeliveryClient({
    projectId: Globals.PROJECT_ID,
    globalQueryConfig: {
      useSecuredMode: true, // Queries the Delivery API using secure access.
    },
    secureApiKey: Globals.SECURE_API_KEY,
    typeResolvers: TypeResolver,

  });

  static SITE_NAME = "AIM";



  static BASE_URL_AIM_Website: string = "http://localhost:4000";

  static EventID = '04f6919c-7c2c-4397-b46c-efcfcab1539a';


  static API_URL: string =
    process.env.NODE_ENV === "production"
      ? "https://payment.aimcongress.com/api/"
      // : "http://localhost:1048/api/";
      : "https://payment.aimcongress.com/api/";

  static NETWORK_URL: string =
    process.env.NODE_ENV === "production"
      ? "https://payment.aimcongress.com/Payment/Payment/"
      : "http://localhost:1048/Payment/Payment/";

  static BASE_URL: string =
    process.env.NODE_ENV === "production"
      ? "https://www.aimcongress.cn/"
      : "http://localhost:4000/";


  static ALLOW_COOKIE: string = "01f10d-allow-cookie";

  static LANG_COOKIE: string = "01f10d-lang-cookie";

  static CURRENT_LANG: string = "English";

  static CURRENT_LANG_CODENAME: string = "default";
}


