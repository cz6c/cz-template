<template>
  <el-form
    ref="formRef"
    class="form-view"
    :model="formData"
    :rules="rules"
    :label-width="props.labelWidth"
    :label-position="props.labelPosition"
  >
    <el-form-item
      v-for="item in props.modelValue"
      :key="item.prop"
      class="form-view-item"
      :prop="item.prop"
      :label="item.label"
      :labelWidth="item.itemLabelWidth || props.labelWidth"
      :required="item.required"
      :style="{ width: item.itemContentWidth || formItemWidth }"
    >
      <!-- 日期选择器 -->
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="item.data"
        v-bind="item.elProps"
        value-format="x"
        :placeholder="item.placeholder || `请选择${item.label}`"
        :disabled="item.disabled"
      />
      <!-- 下拉选择器 -->
      <el-select
        v-else-if="item.type === 'select'"
        v-model="item.data"
        :placeholder="item.placeholder || `请选择${item.label}`"
        :disabled="item.disabled"
      >
        <el-option v-for="{ label, value } in item.options" :key="value" :label="label" :value="value" />
      </el-select>
      <!-- 虚拟列表选择器 -->
      <el-select-v2
        v-else-if="item.type === 'selectV2'"
        v-model="item.data"
        :options="item.options"
        :placeholder="item.placeholder || `请选择${item.label}`"
        :disabled="item.disabled"
      />
      <!-- 开关切换 -->
      <el-switch
        v-else-if="item.type === 'switch'"
        v-model="item.data"
        :active-value="1"
        :inactive-value="0"
        :disabled="item.disabled"
      />
      <!-- 多选 -->
      <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="item.data" :disabled="item.disabled">
        <el-checkbox v-for="{ label, value } in item.options" :key="value" :label="value">{{ label }}</el-checkbox>
      </el-checkbox-group>
      <!-- 单选 -->
      <el-radio-group v-else-if="item.type === 'radio'" v-model="item.data" :disabled="item.disabled">
        <el-radio v-for="{ label, value } in item.options" :key="value" :label="value">{{ label }}</el-radio>
      </el-radio-group>
      <!-- 输入框 -->
      <el-input
        v-else
        v-model="item.data"
        v-bind="item.elProps"
        :placeholder="item.placeholder || `请输入${item.label}`"
        :disabled="item.disabled"
      />
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
  <el-button @click="initilaData(formRef)">重置</el-button>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, withDefaults, defineEmits, defineExpose } from "vue";
import { FormJsonItem } from "../utils/public";
import formFormat from "../hooks/formFormat";
import type { FormInstance, FormRules } from "element-plus";
const formRef = ref<FormInstance>();

interface Props {
  modelValue: Array<FormJsonItem>;
  columns?: number;
  labelWidth?: string | number;
  labelPosition?: "left" | "right" | "top";
}
const props = withDefaults(defineProps<Props>(), {
  columns: 1,
  labelWidth: 120,
  labelPosition: "top",
});
const emit = defineEmits(["sumbit"]);

const { formData, formDataMap } = formFormat({ rawList: props.modelValue });

/**
 * @description: 计算formItem宽度
 * @return {*}
 */
const formItemWidth = computed(() => {
  return props.columns ? `${Math.floor(100 / props.columns)}%` : `100%`;
});

/**
 * @description: 处理表单验证
 * @return {*}
 */
const rules = computed(() => {
  const temp: FormRules = {};
  props.modelValue.forEach(({ type = "input", label, required, rule = [], prop }) => {
    const blurArr = ["input"];
    const trigger = blurArr.includes(type) ? "blur" : "change";
    const message = blurArr.includes(type) ? `请输入${label}` : `请选择${label}`;
    const arr = required ? [{ required: true, message, trigger }] : [];
    const ruleList = [...arr, ...rule];
    temp[prop] = ruleList;
  });
  return temp;
});

/**
 * @description: 提交表单
 */
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      console.log("submit!");
      emit("sumbit", formData.value);
    } else {
      console.log("error submit!");
    }
  });
};

/**
 * @description: 初始化表单数据
 */
const initilaData = (formEl: FormInstance | undefined) => {
  Object.entries(formDataMap.value).forEach(([prop, item]) => {
    formDataMap.value[prop].data = item.initilaData;
  });
  if (!formEl) return;
  formEl.resetFields();
};

defineExpose({
  submitForm,
  initilaData,
});
</script>

<style scoped lang="scss">
.form-view {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    padding-right: 6%;
    box-sizing: border-box;
    :deep(.el-form-item__content) {
      > div {
        width: 300px;
      }
      .el-switch {
        width: auto;
      }
    }
  }
}
</style>
