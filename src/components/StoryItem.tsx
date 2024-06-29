import { Story } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthorDetail } from '@/app/me/StoryPage';
import ClapComponent from '@/app/published/ClapComponent';
import SaveComponent from '@/app/published/SaveComponent';
import { CheckSaved } from '@/actions/Save';
import { ClapCount, ClapCountByUser } from '@/actions/Clap';

type Props = {
    key: string;
    story: Story;
};

const StoryItem = ({ key, story }: Props) => {
    const [userClaps, setUserClaps] = useState<number>(0);
    const [totalClaps, setTotalClaps] = useState<number>(0);
    const [savedStatus, setSavedStatus] = useState<boolean>(false);

    useEffect(() => {
        const fetchClapCountByUser = async () => {
            try {
                const claps = await ClapCountByUser(story.id);
                setUserClaps(claps);
            } catch (error) {
                console.log("Error fetching the user claps", error);
            }
        };

        const fetchTotalClaps = async () => {
            try {
                const claps = await ClapCount(story.id);
                setTotalClaps(claps);
            } catch (error) {
                console.log("Error fetching the claps", error);
            }
        };

        const fetchSavedStatus = async () => {
            try {
                const savedStatus = await CheckSaved(story.id);
                if (savedStatus.Status) {
                    setSavedStatus(savedStatus.Status);
                }
            } catch (error) {
                console.log("Error fetching the saved status", error);
            }
        };

        fetchSavedStatus();
        fetchTotalClaps();
        fetchClapCountByUser();
    }, [story.id]);

    const stripHtmlTags = (htmlString: string) => {
        return htmlString.replace(/<[^>]*>/g, '');
    };

    const match = story.content?.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/);
    const imgSrc = match ? match[1] : '';

    const h1Match = story.content?.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const h1Element = h1Match ? stripHtmlTags(h1Match[1]) : '';

    const contentWithoutH1 = story.content ? story.content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/g, '') : '';
    const textWithoutHtml = stripHtmlTags(contentWithoutH1);
    const first30Words = textWithoutHtml.split(/\s+/).slice(0, 30).join(' ');

    return (
        <div className='mt-5'>
            <Link key={story.id} href={`/published/${story.id}`} className='my-8 border-b-[1px] pb-10 border-neutral-100'>
                <AuthorDetail story={story} />
                <div className='grid md:grid-cols-4 gap-10 grid-cols-2'>
                    <div className='md:col-span-3'>
                        <h1 className='text-xl font-bold py-3'>{h1Element}</h1>
                        <p className='max-md:hidden text-neutral-600 font-serif'>{first30Words} ...</p>
                        <div className='flex items-center space-x-5 mt-6'>
                            {story.topics && (
                                <span className='bg-neutral-50 px-2 py-1 rounded-full text-[13px]'>{story.topics}</span>
                            )}
                            <ClapComponent storyId={story.id} UserClaps={userClaps} ClapCount={totalClaps} />
                            <SaveComponent storyId={story.id} SavedStatus={savedStatus} />
                        </div>
                    </div>
                    <Image width={200} height={200} src={imgSrc ? imgSrc :"/no-image.jpg"} alt='Story Image'/>
                    {/* <Image width={200} height={200} src={imgSrc} alt='Story Image' /> */}
                </div>
            </Link>
        </div>
    );
};

export default StoryItem;
