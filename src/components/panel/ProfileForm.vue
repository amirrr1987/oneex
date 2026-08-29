<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Button from 'ant-design-vue/es/button'
import Form from 'ant-design-vue/es/form'
import FormItem from 'ant-design-vue/es/form/FormItem'
import Input from 'ant-design-vue/es/input'
import { CheckCircleOutlined, IdcardOutlined, MailOutlined, UserOutlined } from '@ant-design/icons-vue'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useZodForm } from '@/composables/useZodForm'
import { profileSchema } from '@/schemas/forms'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { user } = storeToRefs(auth)
const successMessage = ref('')

const { values, fieldError, submit, isSubmitting, reset } = useZodForm(profileSchema, {
  firstName: user.value?.firstName ?? '',
  lastName: user.value?.lastName ?? '',
})

watch(user, (next) => {
  if (!next) return
  reset({ firstName: next.firstName, lastName: next.lastName })
})

async function onSubmit() {
  successMessage.value = ''
  await submit(async () => {
    await auth.updateProfile(values.firstName, values.lastName)
    successMessage.value = 'Profile updated successfully.'
  })
}
</script>

<template>
  <Form layout="vertical" @submit.prevent="onSubmit">
    <FormItem label="Email">
      <Input type="email" :value="user?.email ?? ''" disabled>
        <template #prefix>
          <MailOutlined />
        </template>
      </Input>
    </FormItem>

    <FormItem
      label="First name"
      :validate-status="fieldError('firstName') ? 'error' : undefined"
      :help="fieldError('firstName')"
    >
      <Input v-model:value="values.firstName" placeholder="First name">
        <template #prefix>
          <UserOutlined />
        </template>
      </Input>
    </FormItem>

    <FormItem
      label="Last name"
      :validate-status="fieldError('lastName') ? 'error' : undefined"
      :help="fieldError('lastName')"
    >
      <Input v-model:value="values.lastName" placeholder="Last name">
        <template #prefix>
          <IdcardOutlined />
        </template>
      </Input>
    </FormItem>

    <div class="mx-auto w-3/4">
      <Button type="primary" html-type="submit" block :loading="isSubmitting">
        <template v-if="!isSubmitting" #icon>
          <CheckCircleOutlined />
        </template>
        Update profile
      </Button>
    </div>

    <Alert v-if="successMessage" type="success" :message="successMessage" show-icon class="mt-3" />
  </Form>
</template>
