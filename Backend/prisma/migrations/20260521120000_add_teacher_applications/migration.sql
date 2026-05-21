CREATE TYPE "TeacherApplicationStatus" AS ENUM ('PENDING', 'APPROVED');

CREATE TABLE "teacher_applications" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "document_url" TEXT NOT NULL,
    "status" "TeacherApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewed_at" TIMESTAMP(3),
    "reviewed_by_id" INTEGER,

    CONSTRAINT "teacher_applications_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "teacher_applications_user_id_key" ON "teacher_applications"("user_id");

ALTER TABLE "teacher_applications" ADD CONSTRAINT "teacher_applications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "teacher_applications" ADD CONSTRAINT "teacher_applications_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
