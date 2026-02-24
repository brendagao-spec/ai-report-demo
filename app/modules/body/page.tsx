import { ModulePage } from '@/app/modules/shared/module-page';
import { MODULE_BY_SLUG } from '@/lib/modules';

export default function BodyModulePage() {
  return <ModulePage module={MODULE_BY_SLUG['body']} />;
}
