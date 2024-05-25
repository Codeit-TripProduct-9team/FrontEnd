import type { PluginAPI } from "tailwindcss/types/config";

export const tailwindLineClampUtility = (lines:number[]) => {
  return function ({ addUtilities } : PluginAPI) {
    const utilities:any = {};
    lines.forEach((line) => {
      utilities[`.overflow-ellipsis-${line}`] = {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': `${line}`,
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
      };
    });
    addUtilities(utilities);
  };
};