import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null; // No mostrar si solo hay una página

  return (
    <View className="mt-6 flex-row items-center justify-center gap-2">
      {/* Botón Anterior */}
      <Pressable
        onPress={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white disabled:opacity-50">
        <ChevronLeft size={20} color="#666" />
      </Pressable>

      {/* Números de Página */}
      <View className="flex-row gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Pressable
            key={page}
            onPress={() => onPageChange(page)}
            className={`h-10 w-10 items-center justify-center rounded-lg border ${
              currentPage === page
                ? 'border-[#17a2b8] bg-[#17a2b8]'
                : 'border-gray-300 bg-white'
            }`}>
            <Text
              className={`text-sm font-semibold ${
                currentPage === page ? 'text-white' : 'text-gray-700'
              }`}>
              {page}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Botón Siguiente */}
      <Pressable
        onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white disabled:opacity-50">
        <ChevronRight size={20} color="#666" />
      </Pressable>
    </View>
  );
};