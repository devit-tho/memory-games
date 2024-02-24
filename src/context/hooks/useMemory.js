import { useContext } from 'react';
import { MemoryContext } from '../MemoryContext';

export function useMemory() {
  const context = useContext(MemoryContext);

  if (!context) throw new Error('context is undefined');

  return context;
}
