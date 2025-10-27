'use client'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import {useState} from "react";
import FooterLink from "@/components/forms/FooterLink";

const SignUp = () => {

	const [country, setCountry] = useState<string | undefined>()

	const {register, handleSubmit, control, formState:{errors, isSubmitting}} = useForm<SignUpFormData>({
		defaultValues:{
			fullName: '',
			email: '',
			password:'',
			country: 'US',
			investmentGoals: 'Growth',
			riskTolerance: 'Medium',
			preferredIndustry: 'Technology'
		},
		mode: 'onBlur'
	})

	const onSubmit =async (data:SignUpFormData) => {
		try{
			console.log(data)
		}catch (e){
			console.error(e)
		}
	}

	return (
		<>
			<h1 className="form-title">Sign Up & Personalize</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				<InputField
					name="fullName"
					label="Full name"
					placeholder="Full name"
					register={register}
					error={errors.fullName}
					validation={{ required: 'Full name is required' , minLength: 2}}
				/>

				<InputField
					name="email"
					label="Email"
					placeholder="Enter your email"
					register={register}
					error={errors.email}
					validation={{ required: 'Email is required' , pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: 'Email is required' }}
				/>

				<InputField
					name="password"
					label="Password"
					type="password"
					placeholder="Enter a strong password"
					register={register}
					error={errors.password}
					validation={{ required: 'Password is required' , minLength: 8}}
				/>



				<SelectField
					name="investmentGoals"
					label="Investment Goals"
					placeholder="Select your investment goal"
					options={INVESTMENT_GOALS}
					control={control}
					error={errors.investmentGoals}
					required
				/>

				<SelectField
					name="riskTolerance"
					label="Risk Tolerance"
					placeholder="Select your Risk Level"
					options={RISK_TOLERANCE_OPTIONS}
					control={control}
					error={errors.riskTolerance}
					required
				/>


				<SelectField
					name="preferredIndustry"
					label="Preferred Industry"
					placeholder="Select your Preferred Industry"
					options={PREFERRED_INDUSTRIES}
					control={control}
					error={errors.preferredIndustry}
					required
				/>


				<CountrySelectField
					name="country"
					label="Country"
					error={errors.country}
					required
					value={country}
					onChange={setCountry}
				/>
				{/*<p className="text-sm text-muted-foreground">
					Selected: {country || "None"}
				</p>*/}

				<Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
					{isSubmitting? 'Creating Account' : 'Start Your Investing Journey '}
				</Button>

				<FooterLink text="Already have an account" linkText="Sign-in" href="/sign-in"  />

			</form>
		</>
	)
}
export default SignUp
