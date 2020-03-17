---
title: EKS installation guide
sidebar_label: Installing on EKS
---

This document outlines the installation steps for Amazon Elastice Kubernetes Service (EKS).

## Launch an EKS cluster
We recommend launching a cluster with 2 `m5.xlarge` nodes to start, with autoscaling and network policy enabled. You can add additional CPU/GPU node pools as needed later.

Here are sample [eksctl](https://eksctl.io/introduction/installation/) commands to create a bare minimum cluster:

```bash
eksctl create cluster --name=<cluster-name> --region <region> \
    --nodes 2  \
    --node-volume-size 100 \
    --nodes-min 2 \
    --nodes-max 2 \
    --asg-access \
    --managed \
    --ssh-access
```
To enable auto scaling see [Enable Auto Scaling](https://eksctl.io/usage/autoscaling/)

To enable network policy see [Installing Calico on Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/calico.html)

To enable logging see [Enabling CloudWatch logging](https://eksctl.io/usage/cloudwatch-cluster-logging/)

:::note
You can optionally skip the logging configurtion above and add `--enable-efk-logging` to `opctl` command below.
:::

The `eksctl` command above will automatically retrieve your cluster's access credentials but you can also get them by running:

```
eksctl utils write-kubeconfig --cluster=<cluster-name> --region <region>
```

## Install Onepanel Core
Download the latest `opctl` for your operating system from [our release page](https://github.com/onepanelio/cli/releases/latest)

Run the following command to create `params.yaml` file for EKS:

```bash
opctl init --provider eks --enable-https --enable-cert-manager --dns-provider <dns-provider>
```

:::note
The `--enable-https` is optional and requires a TLS certificate, but it is highly recommended. You can optionally set the `--enable-cert-manager` and `--dns-provider` flags, so TLS certificates are automatically created and renewed via [Let's Encrypt](https://letsencrypt.org/). If you do not set this flag and your DNS provider isn't one of the [supported DNS providers](../configuration/tls#supported-dns-providers), then you have to create a wildcard certificate and manually manage it.
:::

:::note
If you have GPU nodes, you need to set the `--gpu-device-plugins` flag. Valid values are `nvidia` and `amd` or a comma separated combination of both `nvidia,amd`.
:::

Populate `params.yaml` as outlined in [params documentation](../configuration/params)

Finally, run the following command to deploy to your cluster:

```bash
opctl apply
```

Once deployment completes, run the following command to get the external host of Onepanel's gateway:

```bash
kubectl get service istio-ingressgateway -n istio-system -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

Create a CNAME record in your DNS provider that points to the host name returned from the above command.

:::tip
Note that you should use a wildcard CNAME record, for example: `*.example.com` or `*.subdomain.example.com`
:::

Once deployment is complete, use the follownig command to get your auth token to log into Onepanel:

```bash
opctl auth token
```
