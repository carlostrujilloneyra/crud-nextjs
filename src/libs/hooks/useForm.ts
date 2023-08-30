import { useState } from "react"

interface FormValues{
	title: string,
	description: string
}

export const useForm = (initialState: FormValues) => {

	const [formValues, setFormValues] = useState<FormValues>(initialState);

	const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = target;
		
		setFormValues({
			...formValues,
			[name]: value
		})

	}

	const { title, description } = formValues;

	return {
		handleInputChange,
		formValues,
		title,
		description
	}

}