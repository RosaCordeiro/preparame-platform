import Platform from "../../layouts/Platform.vue";

const SubscriptionPlansQueryCrud = () =>
  import("../../components/platform/subscriptionPlansCrud/SubscriptionPlansQueryCrud.vue");
const SubscriptionPlansRegisterCrud = () =>
  import("../../components/platform/subscriptionPlansCrud/SubscriptionPlansRegisterCrud.vue");

const subscriptionPlanRoutes = [
    {
        path: "/subscriptionPlans",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SubscriptionPlansQueryCrud
            }
        }]
    },
    {
        path: "/subscriptionPlans/new",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SubscriptionPlansRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
            ]
        }
    },
    {
        path: "/subscriptionPlans/:id",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SubscriptionPlansRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
            ]
        }
    },
]

export { subscriptionPlanRoutes }
