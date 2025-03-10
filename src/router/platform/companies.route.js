import CompaniesQueryCrud from "../../components/platform/companiesCrud/CompaniesQueryCrud.vue"
import CompanyEmployeesQueryCrud from "../../components/platform/companyEmployeesCrud/CompanyEmployeesQueryCrud.vue"
import CompanyEmployeesRegisterCrud from "../../components/platform/companyEmployeesCrud/CompanyEmployeesRegisterCrud.vue"
import CompaniesRegisterCrud from "../../components/platform/companiesCrud/CompaniesRegisterCrud.vue"
import Platform from "../../layouts/Platform.vue"
import SurveyQuestionsRegisterCrud from "../../components/platform/surveyQuestionsCrud/SurveyQuestionsRegisterCrud.vue"
import SurveyQuestionsQueryCrud from "../../components/platform/surveyQuestionsCrud/SurveyQuestionsQueryCrud.vue"

const companyRoutes = [
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
                'ADMIN',
                'COMPANY_ADMIN'
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
                'ADMIN',
                'COMPANY_ADMIN'
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
                'ADMIN',
                'COMPANY_ADMIN'
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
                'COMPANY_ADMIN'
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
                'COMPANY_ADMIN'
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
                'COMPANY_ADMIN'
            ]
        }
    },
]

export { companyRoutes }