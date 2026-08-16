import { Button, type ButtonProps } from "@/core/components/ui/button"
import { LoadingIcon } from "@/core/lib/icons"

interface ButtonLoadingProps extends ButtonProps {
	isLoading: boolean
}

const ButtonLoading = ({ isLoading, ...props }: ButtonLoadingProps) => {
	return (
		<Button disabled={isLoading} {...props}>
			{isLoading && <LoadingIcon className="animate-spin" />}
			{props.children}
		</Button>
	)
}

export { ButtonLoading }
