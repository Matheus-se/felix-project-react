import { Button, buttonVariants } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { Link } from '@/lib/i18n';
import { availableLanguageTags, languageTag } from '@/src/paraglide/runtime';
import { Globe } from 'lucide-react';

const LocaleMenu = () => {
	const language = { es: 'Españhol', en: 'English' };

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="gap-x-1 rounded-regular border-none px-3 py-2 outline-none">
						<div className="flex size-5 items-center justify-center">
							<Globe size={17} className="!h-[17px] !w-[17px]" />
						</div>
						{languageTag().toUpperCase()}
					</NavigationMenuTrigger>
					<NavigationMenuContent className="!overflow-visible bg-white rounded-regular">
						<div className="p-1">
							{availableLanguageTags.map((tag) => {
								return tag !== languageTag() ? (
									<Link href="/" locale={tag} key={tag}>
										<Button variant="ghost" className="gap-x-1 rounded-regular border-none px-3 py-2 outline-none">
											<div className="flex size-5 items-center justify-center">
												<Globe size={17} className="!h-[17px] !w-[17px]" />
											</div>
											{language[tag]}
										</Button>
									</Link>
								) : null;
							})}
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default LocaleMenu;
