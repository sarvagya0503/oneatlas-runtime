-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "schema" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemaVersion" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "schema" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchemaVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MutationLog" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MutationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviewSnapshot" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "schema" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "PreviewSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PreviewSnapshot_token_key" ON "PreviewSnapshot"("token");

-- AddForeignKey
ALTER TABLE "SchemaVersion" ADD CONSTRAINT "SchemaVersion_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutationLog" ADD CONSTRAINT "MutationLog_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviewSnapshot" ADD CONSTRAINT "PreviewSnapshot_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;
