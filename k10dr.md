# Enabling K10 DR

## 1. Introduction

***Kasten Disaster Recovery*** (aka K10 DR) aims to protect ***Kasten*** from the underlying infrastructure failures. In particular, this feature provides the ability to recover a Kasten install in case of a variety of disasters such as the accidental deletion of Kasten, failure of underlying storage that Kasten uses for its catalog, or even the accidental destruction of the Kubernetes cluster on which Kasten is deployed.

Unlike OADP and Velero which use a single, known key for encrypting all backup data, each Kasten backup is encrypted using unique encryption keys both per-policy and per-application to safeguard data against unauthorized access. As the Kasten catalog contains the primary encryption key used to these unique encryption keys for your backup data, the K10 DR policy must use a separate passphrase for encryption (as it can't encrypt itself).

*In this exercise you will enable the K10 DR feature.*

## 2. Enabling K10 DR

1. In the ***Kasten Dashboard***, select ***Settings → Disaster Recovery*** from the sidebar and click ***Enable K10 DR***.

    ![](static/k10dr/01.png)

1. Fill out the following fields:

    |  |  |
    |---|---|
    | ***Location Profile*** | `ceph-rgw-immutable` |
    | ***Passphrase Method*** | Raw Passphrase |
    | ***Passphrase*** | `iheartK8s!` |

    ![](static/k10dr/02.png)

    > [!IMPORTANT]
    >
    > It's critical that the passphrase used to encrypt K10 DR backups be stored in a safe and secure location, as it is required to restore a K10 DR backup.

    > [!NOTE]
    >
    > See [docs.kasten.io](https://docs.kasten.io/latest/operating/dr.html#enabling-k10-disaster-recovery) for details on configuring third-party secret managers with K10 DR.

1. Click ***Enable K10 DR***.

    ![](static/k10dr/03.png)

    > [!NOTE]
    >
    > The cluster ID corresponds to the `default` Namespace UID, and is used at the root of the Location Profile repository to differentiate between multiple clusters backing up applications to the same bucket.

1. Select ***Policies → Policies*** from the sidebar.

    ![](static/k10dr/04.png)

    You should observe the `k10-disaster-recovery-policy` Policy has been created to protect the local Kasten configuration and catalog of available backups, allowing you to easily restore in the event of complete cluster loss.

    > [!NOTE]
    >
    > See [docs.kasten.io](https://docs.kasten.io/latest/operating/dr.html#recovering-with-the-operator) for details on performing a K10 DR restore operation through the Operator.