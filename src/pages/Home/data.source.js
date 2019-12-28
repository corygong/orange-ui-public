import React from 'react';
import Link from "umi/link";
export const Banner00DataSource = {
  wrapper: { className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children: 'TreeHouse Data',
  },
  content: {
    className: 'banner0-content',
    children: '行业数据仓库&查询门户',
  },
  button: { className: 'banner0-button', children: (

        <Link to='/query'>Learn More</Link>
    ) },
};
export const Content00DataSource = {
  wrapper: { className: 'home-page-wrapper content0-wrapper' },
  page: { className: 'home-page content0' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [{ name: 'title', children: '产品与服务' }],
  },
  block: {
    className: 'block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'icon',
            children:
              '../dist/static/WBnVOjtIlGWbzyQivuyq.png',
          },
          title: { className: 'content0-title', children: '多达百万条统计数据、图表&知识图谱' },
          content: { children: '' },
        },
      },
      {
        name: 'block1',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'icon',
            children:
              '../dist/static/YPMsLQuCEXtuEkmXTTdk.png',
          },
          title: {
            className: 'content0-title',
            children: '汇集1000+国内外数据来源',
          },
          content: { children: '' },
        },
      },
      {
        name: 'block2',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'icon',
            children:
              '../dist/static/EkXWVvAaFJKCzhMmQYiX.png',
          },
          title: { className: 'content0-title', children: '数据库日度更新，不断补充行业信息' },
          content: { children: '' },
        },
      },
    ],
  },
};
