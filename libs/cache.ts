const cache = new Map<
	string,
	{
		document_id: string;
		document_key: string;
	}
>();

export const getCache = (key: string) => cache.get(key);

export const setCache = (key: string, value: any) => cache.set(key, value);

export const clearCache = () => cache.clear();

export const hasCache = (key: string) => cache.has(key);

export const deleteCache = (key: string) => cache.delete(key);

export const getCacheSize = () => cache.size;

export const getCacheKeys = () => cache.keys();

export const getCacheValues = () => cache.values();

export const getCacheEntries = () => cache.entries();

export const forEachCache = (
	callback: (value: any, key: string, map: Map<string, any>) => void
) => cache.forEach(callback);
