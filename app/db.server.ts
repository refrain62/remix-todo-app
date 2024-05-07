// app/db.server.ts
import { PrismaClient } from "@prisma/client";
import { singleton } from "~/singleton.server";

export const prisma = singleton("prisma", () => new PrismaClient());
