'use client';

import { useState, useMemo } from 'react';
import { ShopifyProduct } from '@/sanity/lib/queries';
import { Star, Truck } from 'lucide-react';

export default function ProductInteractive({ product }: { product: ShopifyProduct }) {
  const { store } = product;
  
  // State for selected options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    store.options?.forEach(opt => {
      if (opt.values && opt.values.length > 0) {
        initial[opt.name] = opt.values[0];
      }
    });
    return initial;
  });

  // Find the matching variant based on selected options
  const currentVariant = useMemo(() => {
    if (!store.variants || store.variants.length === 0) return null;
    
    return store.variants.find(v => {
      const variantStore = v.store;
      const option1Match = !store.options?.[0] || variantStore.option1 === selectedOptions[store.options[0].name];
      const option2Match = !store.options?.[1] || variantStore.option2 === selectedOptions[store.options[1].name];
      const option3Match = !store.options?.[2] || variantStore.option3 === selectedOptions[store.options[2].name];
      
      return option1Match && option2Match && option3Match;
    });
  }, [selectedOptions, store.variants, store.options]);

  const price = currentVariant?.store.price || store.variants?.[0]?.store.price || store.priceRange?.minVariantPrice || 0;
  const isAvailable = currentVariant?.store.inventory?.isAvailable ?? (store.variants?.[0]?.store.inventory?.isAvailable ?? true);

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  return (
    <div className="flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <span className="text-2xl font-normal text-zinc-900">${price.toFixed(2)}</span>
        <div className="flex items-center gap-1 text-zinc-500">
          <span className="text-sm">4.5</span>
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        </div>
      </div>
      
      {/* Variant Selectors */}
      <div className="space-y-6 mb-8">
        {store.options?.map((option) => {
          const isColor = option.name.toLowerCase() === 'color';
          
          return (
            <div key={option.name} className="flex flex-col gap-3">
              <span className="text-sm text-zinc-500">
                {option.name}: <span className="text-zinc-900 ml-1">{selectedOptions[option.name]}</span>
              </span>
              <div className="flex flex-wrap gap-3">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value;
                  
                  if (isColor) {
                    const hash = value.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
                    const colorHex = `#${Math.abs(hash).toString(16).substring(0, 6).padStart(6, '0')}`;
                    
                    return (
                      <button
                        key={value}
                        onClick={() => handleOptionSelect(option.name, value)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          isSelected ? 'border-zinc-900 scale-110' : 'border-transparent hover:scale-110'
                        }`}
                        aria-label={`Select ${value}`}
                      >
                        <span 
                          className="block w-full h-full rounded-full border border-zinc-200"
                          style={{ backgroundColor: value.toLowerCase() === 'black' ? '#1a1a1a' : value.toLowerCase() === 'white' ? '#ffffff' : colorHex }}
                        />
                      </button>
                    );
                  }
                  
                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionSelect(option.name, value)}
                      className={`px-6 py-3 text-sm font-medium border rounded-full transition-all ${
                        isSelected 
                          ? 'border-zinc-900 bg-zinc-900 text-white' 
                          : 'border-zinc-200 text-zinc-700 hover:border-zinc-900'
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex flex-col gap-3 mb-8">
        <button 
          disabled={!isAvailable}
          className="w-full bg-[#7a3b2e] text-white py-4 rounded-full text-base font-medium hover:bg-[#632f24] transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed"
        >
          {isAvailable ? 'Add to cart' : 'Out of Stock'}
        </button>
        <button 
          disabled={!isAvailable}
          className="w-full bg-zinc-900 text-white py-4 rounded-full text-base font-medium hover:bg-zinc-800 transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed"
        >
          Buy it now
        </button>
      </div>
      
      <div className="bg-zinc-100 rounded-md p-6 flex flex-col items-center justify-center text-center gap-2">
        <Truck className="w-6 h-6 text-zinc-900 mb-1" />
        <span className="font-medium text-zinc-900 text-sm">Fast shipping</span>
        <span className="text-zinc-500 text-sm">Place your order before 12:00pm and receive it by tomorrow</span>
      </div>
    </div>
  );
}
