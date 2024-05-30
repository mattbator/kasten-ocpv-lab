import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Veeam Kasten Lab Guide - OpenShift Virtualization Roadshow",
  description: "Add-on lab exercises for enterprise-ready Kubernetes data protection",
  base: "/",
  head: [['link', { rel: 'icon', href: './favicon.ico' }]],
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Lab Guide', link: '/install' },
      {
        text: 'Resources',
        items: [
          { text: 'Kasten Docs', link: 'https://docs.kasten.io' },
          { text: 'Kasten Intro Lab (demo.redhat.com)', link: 'https://kastenhq.github.io/k10-openshift-lab.github.io/' },
          { text: 'Interactive Tour - Kasten + OCP', link: 'https://veeamkasten.dev/demo-ocp' },
          { text: 'Clickable Tour - Kasten + OCP-V', link: 'https://veeamkasten.dev/ocpv-kasten-demo '}
        ]
      }
    ],
    logo: { light: '/logo.svg', dark: '/logo-dark.svg' },
    sidebar: [
      {
        text: 'Lab Guide',
        items: [
          { text: 'Installing Veeam Kasten', link: '/install' },
          { text: 'Creating Location Profiles', link: '/location-profile' },
          { text: 'Enabling K10DR', link: '/k10dr' },
          { text: 'Protecting Virtual Machines', link: '/backup-restore' }
        ]
      },
      {
        text: 'Optional',
        items: [
          { text: 'Configuring Multi-Cluster', link: '/multicluster' },
          { text: 'Migrating Workloads', link: '/mobility' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      copyright: '©2024 Veeam® Software'
    }
  }
})