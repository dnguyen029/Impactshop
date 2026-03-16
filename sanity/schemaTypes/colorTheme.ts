import { defineField, defineType } from 'sanity';
import { ColorWheelIcon } from '@sanity/icons';

export const colorTheme = defineType({
  name: 'colorTheme',
  title: 'Color Theme',
  type: 'document',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'background',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code (e.g. #ffffff)',
    }),
    defineField({
      name: 'text',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color code (e.g. #000000)',
    }),
  ],
});
