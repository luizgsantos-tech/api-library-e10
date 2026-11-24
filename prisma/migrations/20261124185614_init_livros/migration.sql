-- CreateTable
CREATE TABLE "Livro" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "ano_pub" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,
    "cover" TEXT NOT NULL DEFAULT 'https://placehold.co/300x450?text=No+Cover',

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);
