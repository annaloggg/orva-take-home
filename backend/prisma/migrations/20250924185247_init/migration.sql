-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "gitId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "htmlUrl" TEXT NOT NULL,
    "apiUrl" TEXT NOT NULL,
    "bio" TEXT,
    "avatarUrl" TEXT NOT NULL,
    "etag" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Repo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "htmlUrl" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "languages" TEXT[],
    "topics" TEXT[],
    "etag" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Repo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- AddForeignKey
ALTER TABLE "public"."Repo" ADD CONSTRAINT "Repo_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
