import Platform from "../../layouts/Platform.vue";

const CompaniesQueryCrud = () =>
  import("../../components/platform/companiesCrud/CompaniesQueryCrud.vue");
const CompanyEmployeesQueryCrud = () =>
  import("../../components/platform/companyEmployeesCrud/CompanyEmployeesQueryCrud.vue");
const CompanyProgramPeopleQueryCrud = () =>
  import("../../components/platform/companyEmployeesCrud/CompanyProgramPeopleQueryCrud.vue");
const CompanyEmployeesRegisterCrud = () =>
  import("../../components/platform/companyEmployeesCrud/CompanyEmployeesRegisterCrud.vue");
const CompaniesRegisterCrud = () =>
  import("../../components/platform/companiesCrud/CompaniesRegisterCrud.vue");
const SurveyQuestionsRegisterCrud = () =>
  import("../../components/platform/surveyQuestionsCrud/SurveyQuestionsRegisterCrud.vue");
const SurveyQuestionsQueryCrud = () =>
  import("../../components/platform/surveyQuestionsCrud/SurveyQuestionsQueryCrud.vue");

const companyRoutes = [
    {
        path: "/program-people",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: CompanyProgramPeopleQueryCrud
            }
        }],
        props: {
            userTypes: [
                'COMPANY_ADMIN'
            ]
        }
    },
    {
        path: "/companies/employees",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: CompanyEmployeesQueryCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN'
            ]
        }
    },
    {
        path: "/companies/employees/new",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: CompanyEmployeesRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN'
            ]
        }
    },
    {
        path: "/companies/employees/:id",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: CompanyEmployeesRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN'
            ]
        }
    },
    {
        path: "/companies",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: CompaniesQueryCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN'
            ]
        }
    },
    {
        path: "/companies/new",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: CompaniesRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN'
            ]
        }
    },
    {
        path: "/companies/:id",
        name: "companies-edit",
        components: {
            site: Platform
        },
        children: [{
            path: "",
            components: {
                content: CompaniesRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN'
            ]
        }
    },
    {
        path: "/surveyQuestions",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SurveyQuestionsQueryCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN'
            ]
        }
    },
    {
        path: "/surveyQuestions/new",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SurveyQuestionsRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN'
            ]
        }
    },
    {
        path: "/surveyQuestions/:id",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: SurveyQuestionsRegisterCrud
            }
        }],
        props: {
            userTypes: [
                'ADMIN'
            ]
        }
    },
]

export { companyRoutes }
