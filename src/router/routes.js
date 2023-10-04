import { platformRoutesGroup } from "./platform/index";
import { siteRoutesGroup } from "./site/index";

const routes = [...platformRoutesGroup, ...siteRoutesGroup];

export default routes;
