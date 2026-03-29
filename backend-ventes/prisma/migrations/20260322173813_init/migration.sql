-- CreateTable
CREATE TABLE "Vente" (
    "id" SERIAL NOT NULL,
    "numProduit" TEXT NOT NULL,
    "design" TEXT NOT NULL,
    "prix" DECIMAL(10,2) NOT NULL,
    "quantite" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vente_pkey" PRIMARY KEY ("id")
);
