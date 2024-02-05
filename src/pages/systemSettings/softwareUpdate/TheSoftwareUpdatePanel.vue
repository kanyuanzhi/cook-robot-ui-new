<template>
  <div class="row">
    <div class="col-6 offset-3">
      <q-list class="text-grey-9">
        <q-item dense>
          <q-item-section>{{ $t("systemSettings.softwareUpdate.name") + useSoftwareInfoStore.name }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>{{
              $t("systemSettings.softwareUpdate.version") + useSoftwareInfoStore.version
            }}
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>{{
              $t("systemSettings.softwareUpdate.model") + useSoftwareInfoStore.machineModel
            }}
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>{{
              $t("systemSettings.softwareUpdate.serialNumber") + useSoftwareInfoStore.serialNumber
            }}
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>{{
              $t("systemSettings.softwareUpdate.updateTime") + useSoftwareInfoStore.updateTime
            }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-btn v-if="!isCheckPassed" push color="teal-6" size="md" @click="check" :disable="isChecking">
            <q-spinner-ios
                v-if="isChecking"
                color="white"
                size="0.7em"
                class="q-mr-md"
            />
            {{ $t("systemSettings.softwareUpdate.checkUpdate") }}
          </q-btn>
          <q-btn v-else push color="teal-6" size="md" :label="$t('systemSettings.softwareUpdate.startUpdate')"
                 @click="beginUpdate"/>
        </q-item>
      </q-list>
      <TheUpdatingDialog ref="theUpdatingDialog"/>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Notify } from "quasar";
import { date } from "quasar";
import TheUpdatingDialog from "pages/systemSettings/softwareUpdate/TheUpdatingDialog.vue";
import { getAPI } from "src/api";
import { UseSoftwareInfoStore } from "stores/softwareInfoStore";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const useSoftwareInfoStore = UseSoftwareInfoStore();

const theUpdatingDialog = ref(null);

const isCheckPassed = ref(false);
const isChecking = ref(false);

onMounted(async () => {
  await useSoftwareInfoStore.fetch();
});

const check = async () => {
  isChecking.value = true;
  try {
    const { data } = await getAPI("softwareUpdater/check-updateInfo");
    const { isLatest, latestVersion, hasFile } = data;
    if (isLatest) {
      Notify.create({
        message: t("systemSettings.softwareUpdate.noNeedUpdateMsg"),
        type: "warning",
      });
    } else if (!hasFile) {
      Notify.create({
        message: t("systemSettings.softwareUpdate.preparingMsg"),
        type: "warning",
      });
    } else {
      isCheckPassed.value = true;
      Notify.create(t("systemSettings.softwareUpdate.hasNewVersionMsg") +
          latestVersion + t("systemSettings.softwareUpdate.permitUpdateMsg"));
    }
  } catch (e) {
    Notify.create({
      message: t("systemSettings.softwareUpdate.checkUpdateFailedMsg"),
      type: "warning",
    });
    console.log(e.toString());
  }
  isChecking.value = false;
};

const beginUpdate = async () => {
  try {
    const { data } = await getAPI("softwareUpdater/check-updatePermission");
    const { isRunning, isUpdating, isPermitted } = data;
    if (!isPermitted) {
      Notify.create({
        message: t("systemSettings.softwareUpdate.isRunningMsg"),
        type: "warning",
      });
      return;
    }
    theUpdatingDialog.value.show();
  } catch (e) {
    console.log(e.toString());
  }
};
</script>

<style lang="scss" scoped>
</style>
