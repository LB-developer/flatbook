import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { FormData } from '../../models/forms'
import FormPage1 from '../components/UserSignUpForms/NewUserDetailForm'
import FormPage2 from '../components/UserSignUpForms/NewUserPictureForm'
import FormPage3 from '../components/UserSignUpForms/NewUserContactForm'
import useCreateProfile from '../hooks/useUserProfile'
import useForm from '../hooks/useFormStep'

const MOCK_DATA = {
  flat_id: 0,
  firstName: '',
  lastName: '',
  nickname: '',
  about: '',
  profile_photo: '',
  email: '',
  number: '',
  socialMedia: '',
  created_at: 0,
}

export default function SignUpForm() {
  const [data, setData] = useState(MOCK_DATA)

  const addUserProfile = useCreateProfile()
  const navigate = useNavigate()
  const { getAccessTokenSilently } = useAuth0()

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields }
    })
  }

  const { step, isFirstStep, isLastStep, back, next } = useForm([
    <FormPage1 {...data} updateFields={updateFields} key={'form-page-1'} />,
    <FormPage2 {...data} updateFields={updateFields} key={'form-page-2'} />,
    <FormPage3 {...data} updateFields={updateFields} key={'form-page-3'} />,
  ])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLastStep) {
      next()
    } else {
      const token = await getAccessTokenSilently()
      const id = await addUserProfile.mutateAsync({ data, token })
      //TODO - change to user/profile
      navigate(`/users/${id}`)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center text-center">
          <form onSubmit={onSubmit} className="mt-6 w-full">
            <div>
              <div>
                <div>{step}</div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={back}
                  className="btn btn-secondary"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className={`btn btn-primary ${isLastStep ? 'btn-accent' : 'btn-primary'}`}
              >
                {isLastStep ? 'Complete' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
