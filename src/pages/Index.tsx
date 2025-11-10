import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  material: string;
  difficulty: string;
  technique: string;
}

interface CartItem extends Product {
  quantity: number;
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
    technique: 'Вязание спицами'
  },
  {
    id: 2,
    name: 'Набор для вышивки "Цветы"',
    price: 899,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/77fcd852-ed40-4235-b338-2393a2e155e1.jpg',
    category: 'Вышивка',
    material: 'Нитки мулине',
    difficulty: 'Средний',
    technique: 'Вышивка крестом'
  },
  {
    id: 3,
    name: 'Профессиональный набор инструментов',
    price: 2499,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/2d43fdc1-78d3-417c-8275-43cb238965fd.jpg',
    category: 'Инструменты',
    material: 'Разное',
    difficulty: 'Профессионал',
    technique: 'Универсальное'
  },
  {
    id: 4,
    name: 'Ткань для пэчворка, 10 цветов',
    price: 1599,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/2d43fdc1-78d3-417c-8275-43cb238965fd.jpg',
    category: 'Шитье',
    material: 'Ткань',
    difficulty: 'Средний',
    technique: 'Пэчворк'
  },
  {
    id: 5,
    name: 'Бисер японский, набор "Пастель"',
    price: 799,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/2d43fdc1-78d3-417c-8275-43cb238965fd.jpg',
    category: 'Бисероплетение',
    material: 'Бисер',
    difficulty: 'Начальный',
    technique: 'Бисероплетение'
  },
  {
    id: 6,
    name: 'Крючки для вязания, набор 12 шт',
    price: 599,
    image: 'https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/467d5ab2-1d42-4212-955a-ec2658bd77ab.jpg',
    category: 'Вязание',
    material: 'Разное',
    difficulty: 'Начальный',
    technique: 'Вязание крючком'
  }
];

const categories = [
  { name: 'Вязание', icon: 'Sparkles', color: 'bg-secondary' },
  { name: 'Вышивка', icon: 'Scissors', color: 'bg-accent' },
  { name: 'Шитье', icon: 'Palette', color: 'bg-primary/20' },
  { name: 'Бисероплетение', icon: 'Star', color: 'bg-secondary' }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);

  const materials = Array.from(new Set(products.map(p => p.material)));
  const difficulties = ['Начальный', 'Средний', 'Профессионал'];
  const techniques = Array.from(new Set(products.map(p => p.technique)));

  const toggleFilter = (value: string, filters: string[], setFilters: (f: string[]) => void) => {
    if (filters.includes(value)) {
      setFilters(filters.filter(f => f !== value));
    } else {
      setFilters([...filters, value]);
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) return false;
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(product.difficulty)) return false;
    if (selectedTechniques.length > 0 && !selectedTechniques.includes(product.technique)) return false;
    return true;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedDifficulty([]);
    setSelectedTechniques([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-accent/30">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <Icon name="Sparkles" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                РукоДелие
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О магазине</a>
              <a href="#workshops" className="text-sm font-medium hover:text-primary transition-colors">Мастер-классы</a>
              <a href="#delivery" className="text-sm font-medium hover:text-primary transition-colors">Доставка</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                                <p className="text-sm text-muted-foreground mb-2">{item.price} ₽</p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 ml-auto"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="home" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Новинка</Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Творите с <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">удовольствием</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Всё для рукоделия в одном месте. Качественные материалы, инструменты и вдохновение для ваших проектов.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="px-8">
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Каталог товаров
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Мастер-классы
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://cdn.poehali.dev/projects/4cfb1d4b-4e27-4c8f-8e6a-3c36017e202d/files/2d43fdc1-78d3-417c-8275-43cb238965fd.jpg" 
                  alt="Товары для рукоделия" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="Heart" className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">500+</p>
                    <p className="text-sm text-muted-foreground">Товаров</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Популярные категории</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon name={category.icon as any} size={32} className="text-primary" />
                  </div>
                  <h4 className="font-semibold">{category.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8">Каталог товаров</h3>
          
          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Фильтры</h4>
                    {(selectedMaterials.length > 0 || selectedDifficulty.length > 0 || selectedTechniques.length > 0) && (
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Сбросить
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h5 className="font-medium mb-3 text-sm">Материал</h5>
                      <div className="space-y-2">
                        {materials.map(material => (
                          <div key={material} className="flex items-center space-x-2">
                            <Checkbox
                              id={`material-${material}`}
                              checked={selectedMaterials.includes(material)}
                              onCheckedChange={() => toggleFilter(material, selectedMaterials, setSelectedMaterials)}
                            />
                            <Label
                              htmlFor={`material-${material}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {material}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-3 text-sm">Сложность</h5>
                      <div className="space-y-2">
                        {difficulties.map(difficulty => (
                          <div key={difficulty} className="flex items-center space-x-2">
                            <Checkbox
                              id={`difficulty-${difficulty}`}
                              checked={selectedDifficulty.includes(difficulty)}
                              onCheckedChange={() => toggleFilter(difficulty, selectedDifficulty, setSelectedDifficulty)}
                            />
                            <Label
                              htmlFor={`difficulty-${difficulty}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {difficulty}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-3 text-sm">Техника</h5>
                      <div className="space-y-2">
                        {techniques.map(technique => (
                          <div key={technique} className="flex items-center space-x-2">
                            <Checkbox
                              id={`technique-${technique}`}
                              checked={selectedTechniques.includes(technique)}
                              onCheckedChange={() => toggleFilter(technique, selectedTechniques, setSelectedTechniques)}
                            />
                            <Label
                              htmlFor={`technique-${technique}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {technique}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <div className="lg:col-span-3">
              <div className="mb-4 text-sm text-muted-foreground">
                Найдено товаров: {filteredProducts.length}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="group hover:shadow-xl transition-all duration-300 animate-fade-in overflow-hidden"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-primary">
                        {product.difficulty}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {product.category}
                      </Badge>
                      <h4 className="font-semibold mb-2 line-clamp-2">{product.name}</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        {product.technique}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                        <Button 
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="group-hover:scale-105 transition-transform"
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-1" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" className="text-white" size={18} />
                </div>
                <span className="font-bold text-lg">РукоДелие</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Всё для вашего творчества с 2024 года
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Покупателям</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Возврат товара</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантия</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О магазине</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Мастер-классы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (999) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@rukodelie.ru</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 РукоДелие. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
