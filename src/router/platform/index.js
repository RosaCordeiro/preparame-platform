import { companyRoutes } from "./companies.route";
import { loginRoutes } from "./login.route";
import { platformRoutes } from "./platform.route";
import { productRoutes } from "./products.route";
import { specialistRoutes } from "./specialists.route";
import { subscriptionPlanRoutes } from "./subscriptionPlans.route";
import { userRoutes } from "./users.route";
import { simulatorVideosGroupRoutes } from "./simulatorVideos.route";
import { resumeRoutes } from "./resume.route";
import { mentoringRoutes } from "./mentoring.route";

const platformRoutesGroup = [
  ...loginRoutes,
  ...[
    ...companyRoutes,
    ...platformRoutes,
    ...productRoutes,
    ...specialistRoutes,
    ...subscriptionPlanRoutes,
    ...userRoutes,
    ...simulatorVideosGroupRoutes,
    ...resumeRoutes,
    ...mentoringRoutes,
  ].map((route) => {
    route.beforeEnter = (to, from, next) => {
      console.log("beforeEnter");

      if (
        localStorage.getItem("token") === null ||
        localStorage.getItem("token") === undefined ||
        localStorage.getItem("token") === ""
      ) {
        next({
          path: "/login",
        });

        sessionStorage.setItem("redirect", to.path);
        return;
      }

      next();

      /*  */
    };

    return route;
  }),
];

export { platformRoutesGroup };
