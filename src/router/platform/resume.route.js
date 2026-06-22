import Platform from "../../layouts/Platform.vue";

const ResumeCreatorPresentations = () =>
  import("../../components/platform/resumeCreator/ResumeCreatorPresentations.vue");
const ResumeCreator = () =>
  import("../../components/platform/resumeCreator/ResumeCreator.vue");

const resumeRoutes = [
    {
        path: "/resumeCreatorPresentation",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: ResumeCreatorPresentations
            }
        }]
    },
    {
        path: "/resumeCreator",
        components: {
            site: Platform
        },
        children: [{
            path: "/",
            components: {
                content: ResumeCreator
            }
        }]
    }]

export { resumeRoutes }
