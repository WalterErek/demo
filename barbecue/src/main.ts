import "./assets/css/reset.css";
import { createApp } from "vue";
import App from "./App.vue";
import {
  Stepper,
  Tab,
  Tabs,
  Empty,
  NavBar,
  SubmitBar,
  Divider,
  NoticeBar,
  Slider,
  Col,
  Row,
  RadioGroup,
  Radio,
  Icon,
  Cell,
  Toast,
  Overlay
} from "vant";

const app = createApp(App);
app
  .use(Stepper)
  .use(Tab)
  .use(Tabs)
  .use(Empty)
  .use(NavBar)
  .use(SubmitBar)
  .use(Divider)
  .use(NoticeBar)
  .use(Slider)
  .use(Col)
  .use(Row)
  .use(RadioGroup)
  .use(Radio)
  .use(Icon)
  .use(Cell)
  .use(Toast)
  .use(Overlay);

app.mount("#app");
