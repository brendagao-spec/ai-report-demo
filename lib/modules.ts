import { ModuleType } from '@prisma/client';

export type ModuleMeta = {
  slug: string;
  type: ModuleType;
  name: string;
  description: string;
};

export const MODULES: ModuleMeta[] = [
  {
    slug: 'body',
    type: ModuleType.BODY,
    name: '身体恢复模块',
    description: '记录睡眠、活动和疼痛恢复状态。'
  },
  {
    slug: 'milk',
    type: ModuleType.MILK,
    name: '母乳与精力模块',
    description: '追踪哺乳节奏与全天精力变化。'
  },
  {
    slug: 'learning',
    type: ModuleType.LEARNING,
    name: '学习结构模块',
    description: '复盘今天学习时长与学习质量。'
  },
  {
    slug: 'emotion',
    type: ModuleType.EMOTION,
    name: '情绪稳定模块',
    description: '记录情绪波动和调节方法效果。'
  },
  {
    slug: 'multichild',
    type: ModuleType.MULTICHILD,
    name: '多娃适应模块',
    description: '关注多孩协同安排与家庭节奏。'
  },
  {
    slug: 'growth',
    type: ModuleType.GROWTH,
    name: '能力升级模块',
    description: '记录能力提升与阶段目标进展。'
  }
];

export const MODULE_BY_SLUG: Record<string, ModuleMeta> = Object.fromEntries(
  MODULES.map((module) => [module.slug, module])
);
