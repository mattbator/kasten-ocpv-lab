# Installing Veeam Kasten <Badge type="tip" text="v6.5.13" />

## 1. Introduction

In this exercise...

## 2. Running Primer Script

1. In the ***OpenShift Console***, open the ***Web Terminal*** and click ***Start*** to initialize the terminal (if prompted).

    ![](static/install/01.png)

1. In the ***Web Terminal***, run the following to...:

    ```bash
    helm repo add kasten https://charts.kasten.io/

    helm repo update

    curl -s https://docs.kasten.io/tools/k10_primer.sh  | bash
    ```

    You should expect to see one or more occurrences of the error below:

    ```
    ...
    At least 1 VolumeSnapshotClass needs the k10.kasten.io/is-snapshot-class annotation set to true. - Error // [!code error]
    ...
    ```

1. Run the following to annotate the available VolumeSnapshotClasses and re-run the primer script:

    ```bash
    oc annotate volumesnapshotclass \
      ocs-storagecluster-rbdplugin-snapclass \
      k10.kasten.io/is-snapshot-class=true
    
    oc annotate volumesnapshotclass \
      ocs-storagecluster-cephfsplugin-snapclass \
      k10.kasten.io/is-snapshot-class=true

    curl -s https://docs.kasten.io/tools/k10_primer.sh  | bash
    ```

    The primer should now complete without errors.

    > [!NOTE]
    >
    > Running the primer script is not required to install Kasten, but is highly recommended.
    >
    > The script can also be used to validate CSI VolumeSnapshot creation and restore capabilities. See [docs.kasten.io](https://docs.kasten.io/latest/install/storage.html#csi-preflight).

1. Close the ***Web Terminal***.

## 3. Installing Kasten

1. In the ***OpenShift Console***, search for `Kasten` in the ***OperatorHub*** and select ***Kasten K10 (Free)***:

    ![](static/install/02.png)

    > [!NOTE]
    >
    > Alternate versions of the Kasten operator are available for use if transacting Kasten licensing through the Red Hat Marketplace. 

1. Click ***Install***.

1. Click ***Install*** to initiate operator installation using the default settings.

    ![](static/install/03.png)

1. After operator installation completes, click ***View Operator*** (or select ***Operators → Installed Operators → Kasten K10 (Free)*** from the sidebar).

1. Under ***Provided APIs > K10***, click ***+ Create instance***.

    ![](static/install/04.png)

1. Under ***Form view***, toggle the following options to ***True***:

    - ***Enable Token Based Authentication***
    - ***Enable K10 dashboard to be exposed via route***
    - ***Create secured edge route for exposing K10***

    ![](static/install/05.png)

    > [!NOTE]
    >
    > YAML view, Helm options...

1. Click ***Create***.

1. From the ***Web Terminal***, run the following to monitor the installation:

    ```bash
    watch oc get pods -n kasten-io
    ```

1. Once all Deployments are ***READY***, press `CTRL+C` to end the `watch`.

    ![](static/install/06.png)

1. Run the following to obtain the token for the `admin` user currently logged into the OpenShift console and copy the output to the clipboard:

    ```bash
    oc whoami -t
    ```

1. Close the ***Web Terminal***.

## 4. Accessing the Kasten Dashboard

1. In the ***OpenShift Console***, select ***Networking → Routes*** from the sidebar and open the `k10-route` Route URL.

    ![](static/install/07.png)

1. Paste the `admin` token value from the previous exercise and click ***Sign-in***.

    ![](static/install/08.png)

1. Specify ***Email*** and ***Company name*** values and click ***Accept Terms***.

    ![](static/install/09.png)

    You should observe that the ***Kasten Dashboard*** is being accessed as your cluster's `admin` user.

    ![](static/install/10.png)

    > [!NOTE]
    >
    > Built-in RBAC...