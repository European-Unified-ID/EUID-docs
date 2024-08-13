const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'EUID Overview',
      link: {
        type: 'doc',
        id: 'intro',
      },
      items: [
        'overviews/overview-publishers',
        'overviews/overview-advertisers',
        'overviews/overview-dsps',
        'overviews/overview-data-providers',
        'overviews/overview-operators-private',
      ],
    },

    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'getting-started/gs-account-setup',
        'getting-started/gs-credentials',
        'getting-started/gs-permissions',
        'getting-started/gs-auth',
        'getting-started/gs-environments',
        'getting-started/gs-encryption-decryption',
        'getting-started/gs-normalization-encoding',
        'getting-started/gs-opt-out',
        'getting-started/gs-faqs',
      ],
    },

    {
      type: 'category',
      label: 'Integration Guides',
      link: {
        type: 'doc',
        id: 'guides/summary-guides',
      },
      collapsed: true,

      items: [
        {
          type: 'category',
          label: 'Publisher Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: false,

          items: [
          {
            type: 'category',
            label: 'Web',
            link: {
              type: 'doc',
              id: 'guides/integration-options-publisher-web',
            },
            collapsed: true,
            items: [
              {
                type: 'category',
                label: 'Prebid',
                link: {
                  type: 'doc',
                  id: 'guides/integration-prebid',
                },
                collapsed: true,
                items: [
                  'guides/integration-prebid-client-side',
                  'guides/integration-prebid-client-server',
                ],
              },

              {
                type: 'category',
                label: 'JavaScript',
                link: {
                  type: 'doc',
                  id: 'guides/integration-javascript',
                },
                collapsed: true,
                items: [
                  'guides/integration-javascript-client-side',
                  'guides/integration-javascript-client-server',
                ],
              },
              'guides/integration-publisher-server-side',
            ],
          },

          {
            type: 'category',
            label: 'Prebid',
            link: {
              type: 'doc',
              id: 'guides/integration-prebid',
            },
            collapsed: true,
            items: [
              'guides/integration-prebid-client-side',
              'guides/integration-prebid-client-server',
            ],
          },

        ],
        },

        {
          type: 'category',
          label: 'Advertiser/Data Provider Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'guides/advertiser-dataprovider-guide',
          ],
        },

        'guides/dsp-guide',

        {
          type: 'category',
          label: 'Private Operator Integrations',
          link: {
            type: 'generated-index',
          },
          collapsed: true,
          items: [
            'guides/operator-guide-aws-marketplace',
          ],
        },
       ],
    },

    {
      type: 'category',
      label: 'SDKs',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'sdks/summary-sdks',
        'sdks/sdk-ref-javascript',
        'sdks/sdk-ref-java',
        'sdks/sdk-ref-python',
        'sdks/sdk-ref-csharp-dotnet',
        'sdks/sdk-ref-cplusplus',
      ],
    },

    {
      type: 'category',
      label: 'Endpoints',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'endpoints/summary-endpoints',
        'endpoints/post-token-generate',
        'endpoints/post-token-validate',
        'endpoints/post-token-refresh',
        'endpoints/post-identity-buckets',
        'endpoints/post-identity-map',
        'endpoints/post-optout-status',
      ],
    },

    {
      type: 'category',
      label: 'Reference Information',
      link: {
        type: 'generated-index',
      },
      collapsed: true,
      items: [
        'ref-info/ref-operators-public-private',
        'ref-info/ref-integration-approaches',
        'ref-info/ref-areas-of-coverage',
        'ref-info/ref-consent-samples',
      ],
    },

    'ref-info/glossary-uid',

  ],
};
module.exports = sidebars;