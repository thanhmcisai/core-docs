/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  gettingStarted: [
    {
      type: 'doc',
      id: 'getting-started/about',
    },
    {
      type: 'doc',
      id: 'getting-started/use-cases',
    },
    {
      type: 'doc',
      id: 'getting-started/contributing',
    },
  ],
  deployment: [
    {
      type: 'doc',
      id: 'deployment/overview',
    },
    { 
      type: 'category',
      label: 'Deploy on public cloud',
      items: [
        'deployment/public/aks',
        'deployment/public/eks',
        'deployment/public/gke',
      ]
    },
    { 
      type: 'category',
      label: 'Deploy on single node',
      items: [
        'deployment/single-node/linux',
        'deployment/single-node/macos',
        'deployment/single-node/windows',
      ]
    }
  ],
  integration: {

  }
};
