// import { ContentSection } from '@components/content-section'
// import { ProfileForm } from './profile-form'

import { Header } from "@/components/layout/header";
import { ContentSection } from "../settings/components/content-section";
import { ProfileForm } from "./pages/profile-form";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";

export function UserProfile() {
    const [editable, setEditable] = useState<boolean>(false);
    return (
        <>
            <Header fixed>
                <Search className='me-auto' />
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
            </Header>
            <div className='mx-auto w-full max-w-2xl px-4 py-6'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-semibold'>Profile</h1>
                    <p className='text-sm text-muted-foreground'>
                        This is how others will see you
                    </p>
                </div>

                <ProfileForm />

                {/* <ContentSection
                    title='Profile'
                    desc='This is how others will see you on the site.'
                >
                </ContentSection> */}
            </div>
        </>
    )
}
