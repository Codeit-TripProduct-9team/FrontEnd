import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  // 검색 로직
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   const searched = invitationList.filter(
  //     (invitation) => invitation.dashboard.title.includes(value) || invitation.inviter.nickname.includes(value),
  //   );
  //   setSearchedInvitationList(searched);
  // };

  return (
    <div className="mx-28 my-20">
      <form action="" className="flex px-16 py-8 gap-8 h-40 rounded-6 outline outline-1 outline-gray-d9">
        <MagnifyingGlassIcon />
        {/* <input type="text" placeholder="검색하기" onChange={(e) => handleSearch(e)} /> */}
        <input type="text" placeholder="검색하기" />
      </form>
    </div>
  );
};

export default SearchBar;
