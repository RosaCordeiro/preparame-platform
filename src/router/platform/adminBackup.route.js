import Platform from "../../layouts/Platform.vue";

const AdminDbBackup = () =>
  import("../../components/platform/adminBackup/AdminDbBackup.vue");

const adminBackupRoutes = [
  {
    path: "/admin/db-backups",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        name: "adminDbBackups",
        components: {
          content: AdminDbBackup,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
];

export { adminBackupRoutes };
