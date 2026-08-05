-- Fixture local: Ver Produtos do Usuário — vínculo employee.userId inconsistente
-- Prefixo: [REPRO] / emails repro.viewproducts.*@prepara.local
-- Uso: docker exec -i database_preparame psql -U docker -d preparame -f - < este arquivo
--
-- Ajuste companyId / productId / specialistId se o banco local diferir.

BEGIN;

DELETE FROM "specialistScheduleFiles" WHERE "specialistScheduleId" IN (
  SELECT id FROM "specialistSchedule" WHERE "userId" IN (
    SELECT id FROM users WHERE email LIKE 'repro.viewproducts.%@prepara.local'
  )
);
DELETE FROM "specialistSchedule" WHERE "userId" IN (
  SELECT id FROM users WHERE email LIKE 'repro.viewproducts.%@prepara.local'
);
DELETE FROM "userProductsAvailable" WHERE "userId" IN (
  SELECT id FROM users WHERE email LIKE 'repro.viewproducts.%@prepara.local'
);
DELETE FROM "companyEmployees" WHERE email LIKE 'repro.viewproducts.%@prepara.local';
DELETE FROM users WHERE email LIKE 'repro.viewproducts.%@prepara.local';

INSERT INTO users (id, name, username, password, email, "documentId", type)
VALUES
  ('aaaaaaaa-0001-4000-8000-000000000001',
   '[REPRO] Ana Alfa Docs', 'repro_ana_alfa',
   '$2a$10$reprofixtureplaceholderhashxxxxxxxxxxxx',
   'repro.viewproducts.ana@prepara.local', '11111111111', 'USER'),
  ('bbbbbbbb-0002-4000-8000-000000000002',
   '[REPRO] Bruno Beta Docs', 'repro_bruno_beta',
   '$2a$10$reprofixtureplaceholderhashxxxxxxxxxxxx',
   'repro.viewproducts.bruno@prepara.local', '22222222222', 'USER');

INSERT INTO "companyEmployees" (
  id, "companyId", name, "documentId", email, "userId",
  accepted, realocate, "showLinkedinInRelocationProgram"
) VALUES
  ('eeeeeeee-0001-4000-8000-000000000001',
   'd032df9e-85ef-4970-ba3f-59338138efc1',
   '[REPRO] Ana Alfa Docs', '11111111111',
   'repro.viewproducts.ana@prepara.local',
   'bbbbbbbb-0002-4000-8000-000000000002', -- ERRADO: Ana → conta Bruno
   true, false, true),
  ('eeeeeeee-0002-4000-8000-000000000002',
   'd032df9e-85ef-4970-ba3f-59338138efc1',
   '[REPRO] Bruno Beta Docs', '22222222222',
   'repro.viewproducts.bruno@prepara.local',
   'bbbbbbbb-0002-4000-8000-000000000002',
   true, false, true),
  ('eeeeeeee-0003-4000-8000-000000000003',
   'd032df9e-85ef-4970-ba3f-59338138efc1',
   '[REPRO] Carla Correta Docs', '33333333333',
   'repro.viewproducts.carla@prepara.local',
   'aaaaaaaa-0001-4000-8000-000000000001', -- Carla → conta Ana
   true, false, true);

INSERT INTO "userProductsAvailable" (id, "userId", "productId", "availableQuantity")
VALUES
  ('dddddddd-0001-4000-8000-000000000001',
   'bbbbbbbb-0002-4000-8000-000000000002',
   '601e03e0-54aa-4a4d-ae48-557e5536a6ed', 1),
  ('dddddddd-0002-4000-8000-000000000002',
   'bbbbbbbb-0002-4000-8000-000000000002',
   '065e87e8-2e2b-47bf-851b-336dd430c810', 1),
  ('dddddddd-0003-4000-8000-000000000003',
   'aaaaaaaa-0001-4000-8000-000000000001',
   'e6c70c03-aca4-4ead-8a18-99ee3d1489c0', 1);

INSERT INTO "specialistSchedule" (
  id, "dateSchedule", status, "specialistId", "userId", "productId", comments
) VALUES
  ('cccccccc-0001-4000-8000-000000000001',
   NOW() - INTERVAL '3 days', 'AVAILABLE',
   '51373634-9d7c-4cc1-a4af-83a743021727',
   'bbbbbbbb-0002-4000-8000-000000000002',
   '601e03e0-54aa-4a4d-ae48-557e5536a6ed',
   'REPRO fixture — produto da conta Bruno'),
  ('cccccccc-0002-4000-8000-000000000002',
   NOW() - INTERVAL '2 days', 'AVAILABLE',
   '51373634-9d7c-4cc1-a4af-83a743021727',
   'aaaaaaaa-0001-4000-8000-000000000001',
   'e6c70c03-aca4-4ead-8a18-99ee3d1489c0',
   'REPRO fixture — produto da conta Ana');

COMMIT;
