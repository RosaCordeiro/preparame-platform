import Platform from "../../layouts/Platform.vue";

const SpecialistsQueryCrud = () =>
  import("../../components/platform/specialistsCrud/SpecialistsQueryCrud.vue");
const SpecialistsRegisterCrud = () =>
  import("../../components/platform/specialistsCrud/SpecialistsRegisterCrud.vue");
const SpecialistProvidesTimetables = () =>
  import("../../components/platform/specialistProvidesTimetables/SpecialistProvidesTimetables");
const ViewProductsUser = () =>
  import("../../components/platform/viewProductsUser/ViewProductsUser.vue");

const specialistRoutes = [
    {
        path: "/specialists",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SpecialistsQueryCrud
            }
        }]
    },
    {
        path: "/specialists/new",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SpecialistsRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
            ]
        }
    },
    {
        path: "/specialists/:id",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SpecialistsRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
            ]
        }
    },
    {
        path: "/providesTimetables",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SpecialistProvidesTimetables
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
                'SPECIALIST'
            ]
        }
    },
    {
        path: "/viewProductsUser",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: ViewProductsUser
            }
        }],
        props: {
            userTypes: [
                'ADMIN',
                'SPECIALIST'
            ]
        }
    },
]

export { specialistRoutes }
