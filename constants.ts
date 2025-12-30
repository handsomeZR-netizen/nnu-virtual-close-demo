import { StyleOption } from './types';

export const STYLE_GALLERY: StyleOption[] = [
  {
    id: 'qipao',
    category: '新中式',
    name: '凤穿牡丹·改良旗袍',
    description: '深靛蓝底色，全身满印精致的白色牡丹与凤凰纹样，高开叉，立领，丝绸光泽与粗布质感结合。',
    promptPart: 'Wearing a modified Cheongsam with Phoenix and Peony patterns in indigo blue style, high slit, mandarin collar, combination of silk luster and coarse cloth texture, slim fit',
    previewImage: 'https://picsum.photos/300/400?random=1',
    tags: ['婚庆', '礼仪']
  },
  {
    id: 'skirt',
    category: '新中式',
    name: '冰裂纹·马面裙套装',
    description: '上身纯白新中式衬衫，下身蓝白相间冰裂纹马面裙，褶皱清晰，几何美学。',
    promptPart: 'Wearing a set of pure white Neo-Chinese shirt on upper body, and blue and white Ice Crackle pattern Horse Face Skirt (Mamianqun) on lower body, clear pleats, dynamic movement, geometric aesthetic',
    previewImage: 'https://picsum.photos/300/400?random=2',
    tags: ['街拍', '日常']
  },
  {
    id: 'hoodie',
    category: '现代潮牌',
    name: '五福捧寿·Oversize卫衣',
    description: '宽松深蓝卫衣，胸口巨大的白色“寿”字变形纹样，周围环绕五只蝙蝠，街头涂鸦风格。',
    promptPart: 'Wearing a modern oversized hoodie with traditional Five Bats surrounding Longevity character pattern in indigo blue style, street graffiti style combined with intangible cultural heritage, washed vintage look',
    previewImage: 'https://picsum.photos/300/400?random=3',
    tags: ['年轻', '休闲']
  },
  {
    id: 'scarf',
    category: '配饰点缀',
    name: '麒麟送子·蓝染大方巾',
    description: '素衣搭配，肩部披挂一条繁复细腻的麒麟纹样蓝印花布大方巾，自然垂坠。',
    promptPart: 'Wearing simple plain clothes, draped with a large Nantong Blue Calico scarf featuring complex and delicate Kirin (Qilin) patterns on shoulders, natural drape, handmade tassel details',
    previewImage: 'https://picsum.photos/300/400?random=4',
    tags: ['旅游', '伴手礼']
  },
  {
    id: 'trench',
    category: '前卫艺术',
    name: '鱼跃龙门·解构主义风衣',
    description: '不对称剪裁的长风衣，大面积泼墨般的蓝白渐变，鲤鱼纹样若隐若现。',
    promptPart: 'Wearing an asymmetrical cut long trench coat, deconstructionism style, large area of splash-ink like blue and white gradient, Carp leaping over Dragon Gate pattern appearing indistinctly, futuristic',
    previewImage: 'https://picsum.photos/300/400?random=5',
    tags: ['艺术展', '秀场']
  },
  {
    id: 'kids',
    category: '亲子装',
    name: '童趣·连年有余肚兜',
    description: '可爱的儿童风格，明显的双鱼纹样，蓝底白花，边缘有手工缝制的白色线迹。',
    promptPart: 'Wearing a cute child-style Dudou (traditional Chinese undergarment) or T-shirt with Double Fish pattern, blue background with white flowers, handmade white stitching edges, pure cotton texture',
    previewImage: 'https://picsum.photos/300/400?random=6',
    tags: ['家庭', '纪念']
  }
];

export const BASE_PROMPT = "Photorealistic, fashion photography, high quality, 8k, detailed texture of Nantong Blue Calico fabric (indigo blue and white), traditional scraping paste dyeing style.";
export const ATMOSPHERE_PROMPT = "Soft studio lighting, elegant atmosphere, depth of field, sharp focus on the fabric texture.";
