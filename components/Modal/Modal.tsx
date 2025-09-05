import ReactModal from "react-modal"
import { cn } from "@/lib/utils";
import Button from "../Button/Button";
import CloseIcon from "@/public/cancel.svg";
import Image from "next/image";
import styles from "./Modal.module.scss";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  shouldCloseOnOverlayClick?: boolean;
  children: React.ReactNode;
  className?: string;
  size?: ModalSize;
  modalDialogClass?: string;
  modalBodyClass?: string;
  modalHeaderClass?: string;
  modalInnerClass?: string;
  dismissIcon?: boolean;
  heading?: string;
  footerButtonLabel?: string;
  footerButtonDisabled?: boolean;
  onFooterButtonClick?: () => void;
  footerElement?: React.ReactNode;
  footerClassName?: string;
  closeIcon?: boolean
};


export default function Modal({
  show,
  onClose,
  shouldCloseOnOverlayClick = true,
  children,
  className,
  size = "md",
  modalDialogClass,
  modalBodyClass,
  modalHeaderClass,
  modalInnerClass,
  dismissIcon = true,
  heading,
  footerButtonLabel,
  footerButtonDisabled,
  onFooterButtonClick,
  footerElement,
  footerClassName,
  closeIcon = true
}: ModalProps) {
	const DismissIcon =  CloseIcon;

	return (
		<ReactModal
			isOpen={show}
			// @ts-ignore
			appElement={typeof window !== "undefined" && document.body}
			onRequestClose={onClose}
			shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
			onAfterClose={() => {
				document.documentElement.classList.remove("_fixed");
				document.body.classList.remove("_fixed");
			}}
			onAfterOpen={() => {
				document.documentElement.classList.add("_fixed");
				document.body.classList.add("_fixed");
			}}
			shouldFocusAfterRender={false}
			shouldReturnFocusAfterClose={false}
			overlayClassName={cn("modal-overlay", className)}
			className={styles["investment-modal"]}
		>
			<div
				className={styles["investment-content"]}
				onClick={(e) => {
					if (e.currentTarget !== e.target || !shouldCloseOnOverlayClick) return;
					onClose();
				}}
			>
				<div
					className={cn(
						"modal-dialog",
						styles["modal-dialog"],
						styles["modal-dialog-" + size],
						modalDialogClass
					)}
				>
					<div className={cn(styles["modal-header"], modalHeaderClass)}>
						{heading && <h2 className="text-lg font-medium">{heading}</h2>}
					{closeIcon && <button onClick={onClose} className="cursor-pointer">
                         <Image src={DismissIcon} alt="cancel button" />
						</button>}	
					</div>
					<div className={cn(styles["modal-body"], modalBodyClass)}>
						<div className={cn(styles["modal-main"], modalInnerClass)}>{children}</div>
					</div>
					{footerButtonLabel && onFooterButtonClick && !footerElement && (
						<div className={styles["modal-footer"]}>
							<Button
								className="w-full max-w-[575px] mx-auto"
								onClick={onFooterButtonClick}
								disabled={footerButtonDisabled}
							>
								{footerButtonLabel}
							</Button>
						</div>
					)}
					{footerElement && !footerButtonLabel && !onFooterButtonClick && (
						<div className={cn(styles["modal-footer"], footerClassName)}>{footerElement}</div>
					)}
				</div>
			</div>
		</ReactModal>
	);
}
