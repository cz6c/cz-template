<template>
  <FormView ref="formView" v-model="formList" labelWidth="126px" labelPosition="right" @sumbit="sumbit" />
</template>

<script setup lang="ts">
import { reactive } from "vue";
import FormView from "@coms/FormView.vue";
import { FormJsonItem } from "@utils/public";
import formFormat from "@hooks/formFormat";

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
const formList: FormJsonItem[] = reactive([
  {
    prop: "name",
    label: "Activity name",
    data: "",
    initilaData: "Hello",
    required: true,
    rule: [{ min: 3, max: 6, message: "Length should be 3 to 6", trigger: "blur" }],
    disabled: true,
  },
  {
    prop: "zone",
    label: "Activity zone",
    data: "",
    initilaData: 1,
    required: true,
    type: "select",
    options: [
      {
        label: "Zone one",
        value: 1,
      },
      {
        label: "Zone two",
        value: 0,
      },
    ],
  },
  {
    prop: "count",
    label: "Activity count",
    data: "",
    initilaData: 1,
    required: true,
    type: "selectV2",
    options,
  },
  {
    prop: "time",
    label: "Activity time",
    data: "",
    initilaData: "",
    required: true,
    type: "date",
    elProps: {
      type: "date",
    },
  },
  {
    prop: "delivery",
    label: "Instant delivery",
    data: "",
    initilaData: 0,
    required: true,
    type: "switch",
  },
  {
    prop: "type",
    label: "Activity type",
    data: [],
    initilaData: [1],
    required: true,
    type: "checkbox",
    options: [
      {
        label: "Online activities",
        value: 1,
      },
      {
        label: "Promotion activities",
        value: 0,
      },
    ],
  },
  {
    prop: "resource",
    label: "Resources",
    data: "",
    initilaData: 1,
    required: true,
    type: "radio",
    options: [
      {
        label: "Sponsorship",
        value: 1,
      },
      {
        label: "Venue",
        value: 0,
      },
    ],
  },
  {
    prop: "desc",
    label: "Activity form",
    data: "",
    initilaData: "",
    required: true,
    elProps: {
      type: "textarea",
    },
  },
]);

const { formDataMap } = formFormat({ rawList: formList });
console.log(formDataMap);

const sumbit = (payload: any) => {
  console.log("submit!", payload);
};
</script>

<style></style>
