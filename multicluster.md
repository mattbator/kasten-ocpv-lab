# Kasten Multi-Cluster

## 1. Introduction

Each Veeam Kasten deployment can function completely independent of other instances, without dependence on a separate customer-hosted or SaaS control plane - making it ideal for GitOps-style management and use in fully airgapped environments. However, Kasten also provides a user interface for providing consolidated observability and centralized management of globally configured Kasten resources - ***Kasten Multi-cluster Manager***.

---

*In this exercise you will configure Kasten Multi-cluster Manager, join a second cluster, and distribute a centrally managed location profile to both clusters.* 

> [!IMPORTANT]
>
> As each learner only has a single cluster, you will need to work with a partner, designating (1) user/cluster as `cluster-1` and (1) user/cluster as `cluster-2`.*

## 2. Configuring Primary Cluster

> [!CAUTION]
>
> This section should be completed by the `cluster-1` user ***ONLY***.

The ***Primary*** cluster defines and stores all global resources, such as Policies and Profiles, and also [aggregates a subset of cluster metrics](https://docs.kasten.io/latest/operating/monitoring.html#k10-multi-cluster-metrics) for centralized reporting.

1. In the ***Kasten Dashboard***, select ***Multi-Cluster*** from the sidebar.

1. Under ***Promote to Primary***, click ***Setup***.

    ![](static/multicluster/02.png)

1. Specify `cluster-1` as the ***Primary Name*** and click ***Promote Cluster → Confirm***.

    ![](static/multicluster/03.png)

    After setup completes, you should see the ***Multi-cluster Manager*** view.

    ![](static/multicluster/04.png)

    > [!NOTE]
    >
    > A Kasten cluster can also be promoted to the primary cluster role declaratively using Helm/Operand parameters. See [docs.kasten.io](https://docs.kasten.io/latest/multicluster/tutorials/getting_started.html#setting-up-the-primary-cluster-using-helm) for details.

1. Select ***Join Tokens*** from the sidebar and click ***+ Create New Join Token***.

    ![](static/multicluster/05.png)

1. Specify `lab-token` as the ***Name*** and click ***Confirm***.

    ![](static/multicluster/06.png)

    > [!NOTE]
    >
    > Join Tokens are a type of Kubernetes Secret that can be created declaratively. See [docs.kasten.io](https://docs.kasten.io/latest/multicluster/tutorials/getting_started.html#join-tokens) for examples.
    >
    > A single token can be used for multiple clusters. Deleting tokens has no impact on clusters that have already joined multi-cluster, but will prevent additional clusters from joining using the deleted token.

2. Click ***Copy*** to copy the token value to the clipboard and send the value to your `cluster-2` partner via one of the following:

    - Email/Slack/etc.
    - Slowly reading it aloud 😡
    - Carrier pigeon 🪶
    - Writing it down on a Post-It and burning it after use 🤷‍♂️
    - Probably stick with Email/Slack/etc. 👍
    - In real life, token values could be distributed to clusters using any Kubernetes Secrets management solution (ex. Vault + External Secrets Operator)

1. Click ***Done***.

## 3. Joining Multi-Cluster from Secondary

> [!CAUTION]
>
> This section should be completed by the `cluster-2` user ***ONLY***.

1. In the ***Kasten Dashboard***, select ***Multi-Cluster*** from the sidebar.

1. Under ***Join a Multi-Cluster System***, click ***Join***.

    ![](static/multicluster/07.png)

1. Paste the `lab-token` value from the primary cluster into the ***Token*** field.

    > [!NOTE]
    >
    > The join token also encodes the Kasten ingress URL required for a secondary to reach the primary cluster. If an alternate URL is required in a production environment, this value can be overridden as seen in the UI.

1. Specify `cluster-2` as the ***Local Cluster Name*** and click ***Use Current*** to populate ***Local Cluster Ingress*** with the current Kasten Route value.

    ![](static/multicluster/08.png)

1. Click ***Connect → Yes*** to join `cluster-2`.

    After a few moments you should observe the Multi-Cluster status page indicating the cluster has been connected to `cluster-1` as a primary.

    ![](static/multicluster/09.png)

    > [!TIP]
    >
    > Joining secondary clusters can also be automated as part of a GitOps-style deployment by creating a `mc-join` Secret and `mc-join-config` ConfigMap on the secondary cluster to provide the join token and name/ingress details. See [docs.kasten.io](https://docs.kasten.io/latest/multicluster/tutorials/getting_started.html#adding-a-secondary-cluster) for details.

## 4. Managing Global Resources

> [!CAUTION]
>
> This section should be completed by the `cluster-1` user ***ONLY***.

1. In the `cluster-1` ***Kasten Dashboard***, select ***Multi-Cluster Manager*** from the dropdown menu and validate the ***Clusters*** page now displays both clusters.

    ![](static/multicluster/10.png)

1. Click the ***Grant Permissions*** button to configure permissions for the current ***Kasten Dashboard*** user.

    This will pre-fill a form to extend the `k10-multi-cluster-admin` ClusterRole to the current user for all current and future Kasten clusters.

    ![](static/multicluster/11.png)

    > [!NOTE]
    > 
    > In a production environment this can be modified to give granular control over a subset of clusters to different users or groups.

1. Keep the default settings and click ***Save***.

1. Select ***Clusters*** from the sidebar and click into `cluster-2` to validate it is accessible. The sidebar dropdown menu can be used to browse between available clusters and the ***Multi-Cluster Manager***.

    ![](static/multicluster/12.png)

1. In ***Kasten Multi-Cluster Manager***, select ***Global Profiles → Location*** from the sidebar and click ***+ New Profile***.

    ![](static/multicluster/13.png)

1. Fill out the following fields and click ***Next***:

    |  |  |
    |---|---|
    | ***Profile Name*** | `global-profile-example` |
    | ***Storage Provider*** | S3 Compatible |

1. In the ***Web Terminal***, run the following to fetch your existing Ceph Object Gateway bucket details:

    ```bash
    export CEPH_S3_ENDPOINT="https://$(oc get route \
      s3-route -n openshift-storage -o jsonpath='{.spec.host}')"
    export AWS_ACCESS_KEY_ID=$(oc get secret \
      rook-ceph-object-user-ocs-storagecluster-cephobjectstore-ocs-storagecluster-cephobjectstoreuser \
      -n openshift-storage -o jsonpath='{.data.AccessKey}' | base64 --decode)
    export AWS_SECRET_ACCESS_KEY=$(oc get secret \
      rook-ceph-object-user-ocs-storagecluster-cephobjectstore-ocs-storagecluster-cephobjectstoreuser \
      -n openshift-storage -o jsonpath='{.data.SecretKey}' | base64 --decode)

    printf '%s\n' 'ACCESS KEY:' ${AWS_ACCESS_KEY_ID} 'SECRET KEY:' ${AWS_SECRET_ACCESS_KEY} 'ENDPOINT:' ${CEPH_S3_ENDPOINT}
    ```

1. Return to the ***Kasten Multi-Cluster Manager*** and fill out the following fields:

    |  |  |
    |---|---|
    | ***S3 Access Key*** | Paste `ACCESS KEY` value |
    | ***S3 Secret*** | Paste `SECRET KEY` value |
    | ***Endpoint*** | Paste `ENDPOINT` value |
    | ***Region*** | `us-east-1` |
    | ***Bucket*** | `kasten` |

    ![](static/multicluster/14.png)

1. Click ***Next → Submit***.

1. Select ***Distributions*** from the sidebar and click ***+ New Distribution***.

    Distributions define which global resources should be synced with which clusters, allowing administrators to define label-based rules to automate resource distribution for new Kasten installs joining multi-cluster.

1. Fill out the following fields:

    |  |  |
    |---|---|
    | ***Name*** | `example-distribution` |
    | ***Clusters*** | Select `dist.kio.kasten.io/cluster-type:primary` |
    | | Select `dist.kio.kasten.io/cluster-type:secondary` |
    | ***Resources*** | Select `global-profile-example` |

    ![](static/multicluster/15.png)

    This configuration will ensure the `global-profile-example` Location Profile is synced to all current and future Kasten clusters. 

1. Click ***Add Distribution***.

    You should observe that the distribution has been synced to the selected clusters.

    ![](static/multicluster/16.png)

    > [!TIP]
    >
    > You can view a summary of global resources for each cluster from the ***Multi-Cluster*** status page as shown below.
    >
    > ![](static/multicluster/17.png)

## 5. Takeaways

- Kasten Multi-Cluster Manager provides an interface for administrators to manage many Kasten deployments from a single interface
- Kasten policies and profiles can be centrally defined to simplify change management and ensure consistency across large environments