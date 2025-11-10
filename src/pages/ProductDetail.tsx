import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  difficulty: string;
  technique: string;
  description: string;
  features: string[];
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Набор пряжи "Радуга"',
    price: 1299,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/467d5ab2-1d42-4212-955a-ec2658bd77ab.jpg',
    category: 'Вязание',
    material: 'Пряжа',
    difficulty: 'Начальный',
    technique: 'Вязание спицами',
    description: 'Яркий набор мягкой акриловой пряжи в 10 цветах радуги. Идеально подходит для вязания детских вещей, пледов и игрушек.',
    features: ['10 мотков по 50г', 'Состав: 100% акрил', 'Длина нити: 150м в мотке', 'Рекомендуемые спицы: 3-4мм'],
    inStock: true
  },
  {
    id: 2,
    name: 'Набор для вышивки "Цветы"',
    price: 899,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/77fcd852-ed40-4235-b338-2393a2e155e1.jpg',
    category: 'Вышивка',
    material: 'Нитки мулине',
    difficulty: 'Средний',
    technique: 'Вышивка крестом',
    description: 'Полный набор для вышивки крестом с красивым цветочным узором. Включает канву, схему, нитки и иглы.',
    features: ['Канва Aida 14', '25 цветов мулине', 'Цветная схема', 'Размер готовой работы: 30x40см'],
    inStock: true
  },
  {
    id: 3,
    name: 'Профессиональный набор инструментов',
    price: 2499,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/2d43fdc1-78d3-417c-8275-43cb238965fd.jpg',
    category: 'Инструменты',
    material: 'Разное',
    difficulty: 'Профессионал',
    technique: 'Универсальное',
    description: 'Профессиональный набор инструментов для всех видов рукоделия. Качественные материалы, удобное хранение.',
    features: ['Ножницы 3 вида', 'Иглы для разных техник', 'Булавки и наперсток', 'Удобный органайзер'],
    inStock: true
  },
  {
    id: 4,
    name: 'Ткань для пэчворка, 10 цветов',
    price: 1599,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/2d43fdc1-78d3-417c-8275-43cb238965fd.jpg',
    category: 'Шитье',
    material: 'Ткань',
    difficulty: 'Средний',
    technique: 'Пэчворк',
    description: '10 отрезов хлопковой ткани с координирующими принтами для создания красивых лоскутных изделий.',
    features: ['100% хлопок', '10 отрезов 50x50см', 'Готовые цветовые сочетания', 'Не линяет при стирке'],
    inStock: true
  },
  {
    id: 5,
    name: 'Бисер японский, набор "Пастель"',
    price: 799,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/2d43fdc1-78d3-417c-8275-43cb238965fd.jpg',
    category: 'Бисероплетение',
    material: 'Бисер',
    difficulty: 'Начальный',
    technique: 'Бисероплетение',
    description: 'Качественный японский бисер ровной формы в нежных пастельных оттенках.',
    features: ['Размер 11/0', '8 пастельных цветов', 'По 10г каждого цвета', 'Ровный калибр'],
    inStock: true
  },
  {
    id: 6,
    name: 'Крючки для вязания, набор 12 шт',
    price: 599,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/467d5ab2-1d42-4212-955a-ec2658bd77ab.jpg',
    category: 'Вязание',
    material: 'Разное',
    difficulty: 'Начальный',
    technique: 'Вязание крючком',
    description: 'Набор эргономичных крючков для вязания с удобными силиконовыми ручками.',
    features: ['Размеры от 2мм до 8мм', 'Эргономичные ручки', 'Алюминиевые крючки', 'Удобный чехол'],
    inStock: false
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <Button onClick={() => navigate('/')}>Вернуться в каталог</Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-accent/30">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                  <Icon name="Sparkles" className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  РукоДелие
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-6">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-[500px] object-cover"
              />
              {!product.inStock && (
                <Badge className="absolute top-4 right-4 bg-destructive">
                  Нет в наличии
                </Badge>
              )}
            </div>
          </div>

          <div className="animate-scale-in">
            <Badge className="mb-3">{product.category}</Badge>
            <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                <Icon name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
              </div>
              <span className="text-sm text-muted-foreground">(24 отзыва)</span>
            </div>

            <p className="text-3xl font-bold text-primary mb-6">{product.price} ₽</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Icon name="Package" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Материал</p>
                  <p className="font-semibold text-sm">{product.material}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Icon name="TrendingUp" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Сложность</p>
                  <p className="font-semibold text-sm">{product.difficulty}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Icon name="Palette" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">Техника</p>
                  <p className="font-semibold text-sm">{product.technique}</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="description" className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="features">Характеристики</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>

            {product.inStock ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-semibold">Количество:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button size="lg" className="flex-1">
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Добавить в корзину
                  </Button>
                  <Button size="lg" variant="outline">
                    <Icon name="Heart" size={20} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-destructive font-semibold">Товар закончился</p>
                <Button size="lg" variant="outline" className="w-full">
                  <Icon name="Bell" size={20} className="mr-2" />
                  Уведомить о поступлении
                </Button>
              </div>
            )}

            <div className="mt-6 p-4 bg-accent/30 rounded-xl">
              <div className="flex items-start gap-3">
                <Icon name="Truck" size={24} className="text-primary mt-1" />
                <div>
                  <h5 className="font-semibold mb-1">Бесплатная доставка</h5>
                  <p className="text-sm text-muted-foreground">При заказе от 2000 ₽</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold mb-8">Похожие товары</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <Card 
                  key={relatedProduct.id}
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {relatedProduct.category}
                    </Badge>
                    <h4 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{relatedProduct.price} ₽</span>
                      <Button size="sm">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
