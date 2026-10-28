import { business } from '@/lib/business';

export function BrandName() {
  const [name, ...description] = business.name.split(' ');
  return <span className="wordmark-name"><span>{name}</span><span>{description.join(' ')}</span></span>;
}
