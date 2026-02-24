'use server';

import { ModuleType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { MODULE_BY_SLUG } from '@/lib/modules';

function dateOnly(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error('无效日期');
  }
  return date;
}

export async function saveModuleEntry(formData: FormData) {
  const slug = String(formData.get('slug') ?? '');
  const module = MODULE_BY_SLUG[slug];

  if (!module) {
    throw new Error('无效模块');
  }

  const dateValue = String(formData.get('date') ?? '');
  const score = Number(formData.get('score'));
  const note = String(formData.get('note') ?? '').trim();

  if (!dateValue) {
    throw new Error('请选择日期');
  }

  if (!Number.isFinite(score) || score < 1 || score > 5) {
    throw new Error('评分必须在 1-5 之间');
  }

  const entryDate = dateOnly(dateValue);

  await prisma.moduleEntry.upsert({
    where: {
      module_date: {
        module: module.type as ModuleType,
        date: entryDate
      }
    },
    update: {
      score,
      note
    },
    create: {
      module: module.type as ModuleType,
      date: entryDate,
      score,
      note
    }
  });

  revalidatePath(`/modules/${slug}`);
  revalidatePath('/review');
  revalidatePath('/dashboard');
}
